import express from 'express';
import bcrypt from 'bcrypt';
const router = express.Router();
import { User } from '../models/user.js'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  

  const user = await User.findOne({email})

  if(user){
    return res.status(400).send({message: "user already exists"})
    
  }
  
  const hashpassword = await bcrypt.hash(password, 10)
  const newUser = new User({
    username,
    email,
    password:  hashpassword
  });

  await newUser.save();
  return res.json({status: true, message: "record registered"});
 
});


router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
  
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid password" });
    }
  
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 360000 });
    return res.json({ status: true, message: "Login successfully" });
  });


  router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '5m' });
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Reset Password',
        text: `Click the link to reset your password: http://localhost:5173/resetPassword/${token}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: "Error sending email" });
        } else {
          return res.status(200).json({ status: true, message: "Email sent successfully" });
        }
      });
    } catch (err) {
      console.error('Error in forgot-password route:', err);
      return res.status(500).json({ message: "Internal server error" });
    }
  });


  router.post('/reset-password/:token', async (req, res) => {
    const { password } = req.body;
    const { token } = req.params;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const id = decoded.id;
      const hashPassword = await bcrypt.hash(password, 10);
      await User.findByIdAndUpdate(id, { password: hashPassword });
      return res.status(200).json({ status: true, message: "Password reset successfully" });
    } catch (err) {
      console.error('Error during password reset:', err);
      return res.status(400).json({ message: "Invalid or expired token" });
    }
  });

  router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({status: true})
})








export { router as UserRouter };
