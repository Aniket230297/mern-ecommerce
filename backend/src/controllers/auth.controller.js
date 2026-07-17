import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields.",
    });
  }

  // Check existing user
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({
      success: false,
      message: "User already exists.",
    });
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Save user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate JWT
  const token = jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Response
  return res.status(201).json({
    success: true,
    message: "User registered successfully.",
    token,
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields.",
    });
  }

  //check user exist
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: "User not found",
    });
  }

  //password match
  const passwordmatched = await bcrypt.compare(password, user.password);

  if (!passwordmatched) {
    return res.status(401).json({ message: "Invalid email or password." });
  }

  //cretae jwt token

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  // 5. Send back success response (excluding password)
  return res.status(200).json({
    success: true,
    message: "Login successful.",
    token,
    user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
    },
});
};