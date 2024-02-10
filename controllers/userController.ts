import { Request, Response } from "express";
import User from "../models/userModel";
import mongoose from "mongoose";
import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    let user: any = req.body;
    let checkEmail = await User.findOne({
      email: user.email,
    });
    if (checkEmail) {
      return res.status(401).json({
        errors: [
          {
            msg: "User is Already Exists!!",
          },
        ],
      });
    }
    let salt = await bcrypt.genSalt(10);
    let encryptPassword = await bcrypt.hash(user.password, salt);
    let newUser = new User({
      name: user.name,
      email: user.email,
      password: encryptPassword,
    });
    newUser = await newUser.save();
    res.status(200).json({
      msg: "Registration is Success",
    });
  } catch (err) {
    res.status(500).json({
      errors: [
        {
          msg: err,
        },
      ],
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    let { email, password } = req.body;

    // check if email is exists
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(401).json({
        errors: [{ msg: "Invalid Email id" }],
      });
    }

    // check if the password is correct
    let isMatch: boolean = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        errors: [{ msg: "Invalid Password" }],
      });
    }

    // create a payload & Token
    let payload = {
      id: user.id,
    };

    let secretKey: string | undefined = process.env.JWT_SECRET_KEY;
    if (secretKey) {
      let token = await jwt.sign({ data: payload }, secretKey, {
        expiresIn: "1h",
      });
      res.status(200).json({
        msg: "Login is Success",
        token: token,
      });
    } else {
      res.status(400).json({
        errors: [{ msg: "Server Error, unable to create a token" }],
      });
    }
  } catch (error) {
    res.status(500).json({
      errors: [
        {
          msg: error,
        },
      ],
    });
  }
};


export const allUser = async (req: Request, res: Response) => {
  try {
    var mysort: any = { name: 1 };
    const data = await User.find().select("-password").sort(mysort);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      errors: [
        {
          msg: err,
        },
      ],
    });
  }
};
