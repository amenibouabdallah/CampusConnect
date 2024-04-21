const User = require('../models/User');
const UserPending = require('../models/UserPending');
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
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

module.exports = {
    getUserByEmail,changePasswordOrEmail, getUsers, handleConfirmAction
};
