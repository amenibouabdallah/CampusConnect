const User = require('../models/User');
const FileProfiToConfirm =require('../models/FileProfToConfirm');
const FileConfirmed=require('../models/FileConfirmed');
const bcrypt = require('bcrypt');
const multer = require('multer');
const cloudinary = require('../cloudinary/cloudinary');
const streamifier = require('streamifier');
const path =require('path');


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

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  });
  const upload = multer({ storage: storage }).single('file');

 const uploadFile = (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file', error: err });
      }
      try {
        const { filename, path, size, mimetype} = req.file;
        const {fullName, selectedDate, docType, uploadedBy} = req.body;
        console.log(fullName, selectedDate, docType);
        const file = new FileProfiToConfirm({

         fileName: filename,
          path: path,
          size: size,
          mimetype: mimetype,
          docType: docType,
          fullName: fullName,
          selectedDate: selectedDate,
          uploadedBy:uploadedBy,
        });
        await file.save();
        File.find({})
        .then((files) => {
          // Log or send the data to console
          console.log(files);
        })
        .catch((err) => {
          // Log or send the error
          console.log(err);
        });
        
  
        res.status(201).json({ message: 'File uploaded successfully', file });
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    });
  };

module.exports = {
    getUserByEmail,
    changePasswordOrEmailOrFullNameOrProfilePicture,uploadFile
};
