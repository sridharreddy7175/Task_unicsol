import { Router } from "express";
import {
  allUser,
  createUser,
  login,
} from "../controllers/userController";
const userRoutes = Router();
import verifyToken from "../middlewares/TokenVerifier";
import { validateBodyPayload } from "../validation/validator";
import { loginSchema, userRegistrationSchema } from "../validation/schema";

userRoutes.post(
  "/createUser",
  validateBodyPayload.bind(null, userRegistrationSchema),
  createUser
);
userRoutes.post("/login", validateBodyPayload.bind(null, loginSchema), login);
userRoutes.get("/allUsers", verifyToken, allUser);


export default userRoutes;
