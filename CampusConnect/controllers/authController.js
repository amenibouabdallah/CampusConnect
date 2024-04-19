const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const User = require('../models/User');
const UserToConfirm = require('../models/UserToConfirm');
const UserForgotPass = require('../models/UserForgotPass');
const multer = require('multer');
// Multer setup for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
dotenv.config();

const secret = process.env.JWT_SECRET;
const emailUsername = process.env.EMAIL_USERNAME;
const emailPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: 'amenybouabdallah@gmail.com',
     pass: 'xkti lxpm hbnx emlw'}
});

const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000);
};

const sendVerificationEmail = async (email, code) => {
  const mailOptions = {
    from: emailUsername,
    to: email,
    subject: 'Verification Code for Campus Connect',
    text: `Your verification code is: ${code}`,
  };

  await transporter.sendMail(mailOptions);
};

const signUp = async(req, res) => {
	try{
		const{ email, password, role, userType, university} = req.body;
const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

 const hashedPassword = await bcrypt.hash(password, 10);
const userC = new UserToConfirm({
      email,
      password: hashedPassword,
      role,
      userType, 
      university,
      
	
    });
await userC.save();
res.status(201).json({message: 'User Saved and waiting to Complete account'});
}catch(error){
res.status(500).json({message:error.message});}};
//cloudinary settings

const cloudinary = require('../cloudinary/cloudinary');
//complete profile
const streamifier = require('streamifier');


const completeProfile = async (req, res) => {
  try {
      // Extract necessary data from request
      const { fullName, email } = req.body;
      const profileImage = req.file;

      // Check if required fields are present
      if (!fullName || !profileImage) {
          return res.status(400).json({ message: "Full name and profile picture are required" });
      }

      // Upload image to Cloudinary
      const uploadedImage = await streamUpload(profileImage.buffer);
      // confirmation code 
      const verificationCode = generateVerificationCode();
      await sendVerificationEmail(email, verificationCode);

      // Update user's profile
      const user = await UserToConfirm.findOneAndUpdate(
          { email: email },
          { fullName: fullName, profileImage: uploadedImage.secure_url, verificationCode: verificationCode },
          { new: true }
      );

      // Check if user exists
      if (!user) {
          return res.status(404).json({ message: "User not found" });
      }

      // Send success response
      res.status(200).json({ message: "Profile completed successfully" });
  } catch (error) {
      // Handle errors
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
  }
};

// Function to upload file buffer to Cloudinary using streams
const streamUpload = (buffer) => {
  return new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream({ upload_preset: "campus" }, (error, result) => {
          if (error) {
              reject(error);
          } else {
              resolve(result);
          }
      });

      require("streamifier").createReadStream(buffer).pipe(stream);
  });
};

//confirm code

const confirmCode = async (req,res) => {
    try{
        const { email, verificationCode } = req.body;
        
        const userToConfirm = await UserToConfirm.findOne({email});

        if (!userToConfirm){
            return res.status(404).json({ message: 'User not found' });
    }else{
    if(userToConfirm.verificationCode===verificationCode){
        const user = new User({
            email: userToConfirm.email,
            password: userToConfirm.password, 
            userType: userToConfirm.userType,
            university: userToConfirm.university,
            fullName: userToConfirm.fullName,
            profileImage: userToConfirm.profileImage,
           
        });
         
        await user.save();
        await UserToConfirm.findOneAndDelete({ email });
    
        res.status(201).json({ message: 'User created successfully' });
    }else{
        return res.status(400).json({ message:'Verification code mismatch'});

    }
  }
   
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };
    const signIn = async (req, res) => {
      try {
          const { email, password } = req.body;
  
          const user = await User.findOne({ email });
  
          if (!user) {
              return res.status(404).json({ message: 'User not found' });
          }
  
          const isPasswordValid = await bcrypt.compare(password, user.password);
  
          if (!isPasswordValid) {
              return res.status(401).json({ message: 'Invalid password' });
          }
  
          // Assuming user.typeAccount represents the type of the account
          let redirectPath = '/profile'; // default redirect path
          if (user.email === 'amenybouabdallah@gmail.com') {
              redirectPath = '/admin/users';
          }
  
          // JWT token generation
          const token = jwt.sign({ userId: user._id, email: user.email, userType: user.userType }, 'your_secret_key', { expiresIn: '1h' });
  
          res.status(200).json({ message: 'Sign in successful', token, redirectPath });
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };
  


  const forgotPassword = async(req, res)=>{
    try{
        const{email} = req.body;
        const user = await User.findOne({email});
        if(!user){
            return res.status(404).json({message:'user not found'});
    }
    const verificationCode = generateVerificationCode();
    await sendVerificationEmail(email, verificationCode);
    
    const userF= new UserForgotPass({
        email: user.email,
        password: user.password,
        role: user.role,
        userType: user.userType,
        university : user.university,
        fullName: user.fullName,
        profileImage: user.profilePicture,
        verificationCode: verificationCode});
    await userF.save();
    res.status(201).json({message: 'User who forgot password is saved and waiting to confirm code'});
    }catch(error){
    res.status(500).json({message:error.message});}};
    
    const confirmCodeForgot = async(req, res)=>{
        try{
            const {email, verificationCode} = req.body;
            const userF = await UserForgotPass.findOne({email});
            if(!userF){
                return res.status(404).json({message: 'User not found'});
        }
            if(userF.verificationCode===verificationCode){
                res.status(201).json({message: 'Code Confirmed lets change passwords'});
        await UserForgotPass.findOneAndDelete({email});
        }else{
            return res.status(400).json({message:'Verification code mismatch'});
        }
        }catch(error){
            res.status(500).json({message: error.message});
        }
        };
    
        const newPassword = async(req, res)=>{
            try{
                const{email, password, confirmPassword} = req.body;
                const user = await User.findOne({email});
                if(!user){
                    return res.status(404).json({message: 'User not found'});
                }
                if (password!==confirmPassword){
                    return res.status(400).json({message: 'Unmatched Passwords, try again.'});
                }
                else{
                const hashedPassword = await bcrypt.hash(password, 10);
                user.password=hashedPassword;
                await user.save();
                res.status(200).json({message:'Password reset successful'});
        }
        }catch(error){
            res.status(500).json({message: error.message});
    }
        }	
    

module.exports = {signUp, signIn, forgotPassword, confirmCode, confirmCodeForgot,newPassword,completeProfile};