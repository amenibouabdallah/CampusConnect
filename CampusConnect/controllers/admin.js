const User = require('../models/User');

const getUserByEmail = async (req, res) => {
    try {
        // Get the email from the request body
        const { email } = req.body;

        // Validate the input email
        if (!email || typeof email !== 'string') {
            return res.status(400).json({ message: 'Invalid email provided' });
        }

        // Find the user by email
        const user = await User.findOne({ email });

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




module.exports = {
    getUserByEmail
};
