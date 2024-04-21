const User = require('../models/User');
const UserPending = require('../models/UserPending');
const bcrypt = require('bcrypt');

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
            profileImage: user.profileImage,
            fullName: user.fullName,
            status: 'active',  
            dateCreated: user.dateCreated,
            userType: user.userType,
            email: user.email,
            university: user.university,
        }));

        const formattedUserPending = filteredUserPending.map(user => ({
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


module.exports = {
    getUserByEmail,changePasswordOrEmail, getUsers
};
