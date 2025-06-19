const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
      const { name, email, password  } = req.body;
  
      if (!name  || !email || !password) {
        return res.status(400).json({ message: "❗ Enter all the details" });
      }
  
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: "❗ User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
      });
  
      await newUser.save();
  
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "🚨 Internal server error" });
    }};



exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).send("Email and password are required");
      }
  
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).send("User not found");
      }
  
      if (!user.password) {
        return res
          .status(500)
          .json({ messgae: "Password not set for user in DB" });
      }
  
      const matchPassword = await bcrypt.compare(password, user.password);
  
      if (matchPassword) {
        const token = await jwt.sign({ _id: user._id }, "Shutpix@123", {expiresIn:"1d"});
  
        res.cookie("token", token);
  
        return res.status(200).send("User logged in...");
      } else {
        return res.status(401).json({ message: "Invalid credentials" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong" });
    }
};
