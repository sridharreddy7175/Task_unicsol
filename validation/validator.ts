import Joi from "joi";
import { Request, Response, NextFunction } from "express";

export function validateBodyPayload(
  schema: Joi.Schema,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { error, value } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({
      error: {
        message: "Payload Validation Failed",
        details: error.details.map((detail) => detail.message),
      },
    });
  }
  console.log("Payload Validation is Successful");
  next();
}
