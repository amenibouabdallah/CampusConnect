const User = require('../models/User');
const UserPending = require('../models/UserPending');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const FileConfirmed= require('../models/FileConfirmed');
const FileProfToConfirm=require('../models/FileProfToConfirm');
const File = require('../models/File');
const getUserByEmail = async (req, res) => {
    try {
        // Get the email from the request body
        const { _id } = req.body;

        // Validate the input email
        

        // Find the user by email
        const user = await User.findOne({ _id });

        if (user) {
            // If user is found, return the user data
            res.status(200).json({ user });
        } else {
            // If user is not found, return an error message
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        // Handle errors and return an appropriate response
        console.error('Error getting user by email:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const changePasswordOrEmail = async (req, res) => {
    try {
        const { email, newEmail, newPassword, confirmPassword } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (newEmail) {
            if (newEmail === user.email) {
                return res.status(400).json({ message: 'New email cannot be the same as the current email' });
            }
            const existingUser = await User.findOne({ email: newEmail });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
            user.email = newEmail;
        }

        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: 'Unmatched passwords, try again.' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.status(200).json({ message: 'Update successful' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        const userPending = await UserPending.find();

        const filteredUsers = users.filter(user => user.userType);
        const filteredUserPending = userPending.filter(user => user.userType);

        const formattedUsers = filteredUsers.map(user => ({
            id: user.id,
            profileImage: user.profileImage,
            fullName: user.fullName,
            status: 'active',  
            dateCreated: user.dateCreated,
            userType: user.userType,
            email: user.email,
            university: user.university,
        }));

        const formattedUserPending = filteredUserPending.map(user => ({
            id: user.id,
            profileImage: user.profileImage,
            fullName: user.fullName,
            status: 'pending',  
            dateCreated: user.dateCreated,
            userType: user.userType,
            email: user.email,
            university: user.university,
        }));

        const allFormattedUsers = [...formattedUsers, ...formattedUserPending];

        res.status(200).json(allFormattedUsers);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
const handleConfirmAction = async (req, res) => {
    const { action, userIdToConfirm } = req.body;

    try {
        if (action === 'accept') {
            // Accept action: create new user in User module and delete user from UserPending
            const userPending = await UserPending.findById(userIdToConfirm);
            if (userPending) {
                const newUser = new User({

                    email: userPending.email,
                    password: userPending.password,
                    userType: userPending.userType,
                    university: userPending.university,
                    fullName: userPending.fullName,
                    profileImage: userPending.profileImage
                });
                
                // Save the new user to the User model
                await newUser.save();

                // Delete user from UserPending model
                await UserPending.findByIdAndDelete(userIdToConfirm);

                // Send email using nodemailer
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    host:'smtp.gmail.com',
                    port:465,
                    secure:true,
                    auth: {
                        user: 'amenybouabdallah@gmail.com',
                        pass: 'xkti lxpm hbnx emlw',
                    },
                });

                const mailOptions = {
                    from: 'amenybouabdallah@gmail.com',
                    to: newUser.email,
                    subject: 'Account Accepted',
                    text: 'Your account has been accepted. Welcome!',
                };

                await transporter.sendMail(mailOptions);

                res.status(200).send(`Accepted user with ID ${userIdToConfirm}`);
            } else {
                res.status(404).send(`UserPending with ID ${userIdToConfirm} not found`);
            }
        } else if (action === 'reject') {
            // Reject action: delete user from UserPending
            const result = await UserPending.findByIdAndDelete(userIdToConfirm);
            if (result) {
                res.status(200).send(`Rejected user with ID ${userIdToConfirm}`);
            } else {
                res.status(404).send(`UserPending with ID ${userIdToConfirm} not found`);
            }
        } else if (action === 'delete') {
            // Delete action: delete user from User
            const result = await User.findByIdAndDelete(userIdToConfirm);
            if (result) {
                res.status(200).send(`Deleted user with ID ${userIdToConfirm}`);
            } else {
                res.status(404).send(`User with ID ${userIdToConfirm} not found`);
            }
        } else {
            // Invalid action
            res.status(400).send('Invalid action');
        }
    } catch (error) {
        console.error(`Error handling action: ${action}`, error);
        res.status(500).send('Internal server error');
    }
};

const getDocuments = async (req, res) => {
    try {
        // Fetch files from both collections
        const filesToConfirm = await FileProfToConfirm.find();
        const filesConfirmed = await FileConfirmed.find();
        const fileAdmin = await File.find();
        // Function to format a file document
        const formatFile = async (file, status) => {
            // Fetch the user based on uploadedBy field
            const user = await User.findById(file.uploadedBy);
            let submitted;

if (user) {
    if (user.userType) {
        submitted = user.fullName; // Assign user.fullName to submittedBy
    } else {
        submitted = 'Admin'; // Assign 'Admin' to submittedBy if userType is not teacher or student
    }
} else {
    submitted = 'Unknown'; // Assign 'Unknown' to submittedBy if user does not exist
}

            // Return the formatted file document
            return {
                // Populate the fields
                _id: file._id,
                fullName: file.fullName,
                selectedDate: file.selectedDate,
                uploadedAt: file.uploadedAt,
                docType: file.docType,
                status: status, // 'pending' or 'accepted' depending on the collection
                submittedBy: submitted

            };
        };

        // Format files from FileProfToConfirm collection
        const formattedFilesToConfirm = await Promise.all(
            filesToConfirm.map(file => formatFile(file, 'pending'))
        );

        // Format files from FileConfirmed collection
        const formattedFilesConfirmed = await Promise.all(
            filesConfirmed.map(file => formatFile(file, 'accepted'))
        );
        const formattedFileAdmin = await Promise.all(
            fileAdmin.map(file=>formatFile(file,'accepted'))
        )

        // Combine formatted files
        const allFormattedFiles = [...formattedFilesToConfirm, ...formattedFilesConfirmed,...formattedFileAdmin];

        // Send response with the formatted files
        res.status(200).json(allFormattedFiles);
    } catch (error) {
        console.error('Error fetching files:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
    
const handleConfirmActionDocs = async (req, res)=>{
    const{action,docIdToConfirm} = req.body;
    try{
        if (action ==='accept')
        {
            const filePending= await FileProfToConfirm.findById(docIdToConfirm);
            if(filePending){
                const newFile = new FileConfirmed({
                    fileName:filePending.fileName,
                    docType: filePending.docType,
                    fullName:filePending.fullName,
                    selectedDate:filePending.selectedDate,
                    uploadedAt:filePending.uploadedAt,
                    uploadedBy:filePending.uploadedBy,
                    path:filePending.path,
                    size:filePending.size,
                    mimeType:filePending.mimeType
                    
                });
                await newFile.save();
                await FileProfToConfirm.findByIdAndDelete(docIdToConfirm);
                res.status(200).json({message:'Document accepted'});
            }
            else{
                res.status(404).json({message:'Document not found'});
            }

        }else if(action==='reject'){
            const result = await FileProfToConfirm.findByIdAndDelete(docIdToConfirm);
            if(result){
                res.status(200).json({message:'Document rejected'});
            }else{
                res.status(404).json({message:'Document not found'});
            }
        }else if(action==='delete'){
            let result = await FileConfirmed.findByIdAndDelete(docIdToConfirm);
            if (!result) {
                result = await File.findByIdAndDelete(docIdToConfirm);
            }
            if(result){
                res.status(200).json({message:'Document deleted'});
            }else{
                res.status(404).json({message:'Document not found'});
            }
        }else {
            res.status(400).json({message:'Invalid action'});
        }
    }catch(error){
        console.error(`Error handling action: ${action}`, error);
        res.status(500).json({message:'Internal server error'});
    }
}
module.exports = {
    getUserByEmail,changePasswordOrEmail, getUsers, handleConfirmAction,getDocuments, handleConfirmActionDocs
};
