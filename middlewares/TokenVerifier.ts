import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

interface AuthenticatedRequest extends Request {
  user?: any;
}

const verifyToken = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  let token: any =
    req.headers["x-access-token"] ||
    req.headers["Authorization"] ||
    req.headers["authorization"] ||
    req.headers["session"] ||
    req.headers["Bearer"];

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    let secretKey: any = process.env.JWT_SECRET_KEY;

    jwt.verify(token, secretKey, async (err: any, decoded: any) => {
      if (err) {
        res.status(400).json({ message: "Token is not valid" });
      } else {
        const user: any = await userModel.findOne({ _id: decoded?.data?.id });
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(404).json({ message: "User not found" });
        }
      }
    });
  } else {
    res.status(401).json({ message: "Unauthorized Access" });
  }
};

export default verifyToken;
