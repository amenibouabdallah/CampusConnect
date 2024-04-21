const User = require('../models/User');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cloudinary = require('../cloudinary/cloudinary');
const streamifier = require('streamifier');




const getUserByEmail = async (req, res) => {
    try {
        const { _id } = req.body;

        // Find the user by ID
        const user = await User.findOne({ _id });

        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error('Error getting user by email:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

const changePasswordOrEmailOrFullNameOrProfilePicture = async (req, res) => {
    try {
        const { email, newEmail, newPassword, confirmPassword, newFullName } = req.body;
        const profileImage = req.file;

        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Handle email change
        if (newEmail) {
            // Ensure the new email is different and not already in use
            if (newEmail === user.email) {
                return res.status(400).json({ message: 'New email cannot be the same as the current email' });
            }
            const existingUser = await User.findOne({ email: newEmail });
            if (existingUser) {
                return res.status(400).json({ message: 'Email is already in use' });
            }
            user.email = newEmail;
        }

        // Handle password change
        if (newPassword && confirmPassword) {
            if (newPassword !== confirmPassword) {
                return res.status(400).json({ message: 'Passwords do not match' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
        }

        // Handle full name change
        if (newFullName) {
            user.fullName = newFullName;
        }

        // Handle profile picture change
        if (profileImage) {
            const uploadedImage = await streamUpload(profileImage.buffer);
            user.profileImage = uploadedImage.secure_url;
        }

        // Save the updated user information
        await user.save();

        res.status(200).json({ message: 'Update successful' });
    } catch (error) {
        console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Function to upload file buffer to Cloudinary using streams
const streamUpload = (buffer) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
        streamifier.createReadStream(buffer).pipe(stream);
    });
};


module.exports = {
    getUserByEmail,
    changePasswordOrEmailOrFullNameOrProfilePicture
};
