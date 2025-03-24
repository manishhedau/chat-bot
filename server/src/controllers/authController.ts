import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { getUserModel } from "../models/User";
import { JwtPayload } from "../types";

export const register = async (req: Request, res: Response) => {
  try {
    const { username, password, clientId } = req.body;

    // Get the appropriate User model for the client
    const UserModel = getUserModel(clientId);

    // Check if user already exists
    const existingUser = await UserModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new UserModel({
      username,
      password: hashedPassword,
      clientId,
    });

    await user.save();

    // Generate JWT token
    const payload: JwtPayload = {
      userId: user._id.toString(),
      username: user.username,
      clientId: user.clientId,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "Account created successfully",
      data: {
        token,
        user: {
          userId: user._id,
          username: user.username,
          clientId: user.clientId,
        },
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password, clientId } = req.body;

    // Get the appropriate User model for the client
    const UserModel = getUserModel(clientId);

    // Find user
    const user = await UserModel.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "Invalid credentials" });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Generate JWT token
    const payload: JwtPayload = {
      userId: user._id.toString(),
      username: user.username,
      clientId: user.clientId,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "24h",
    });

    res.json({
      message: "Login successful",
      data: {
        token,
        user: {
          userId: user._id,
          username: user.username,
          clientId: user.clientId,
        },
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
