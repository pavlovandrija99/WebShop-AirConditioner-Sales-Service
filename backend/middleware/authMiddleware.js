import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protectRoute = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_STRING);

      req.user = await userModel.findById(decodedToken.id);

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error(
        "Token verification failed! Token value might be manipulated!"
      );
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized! No token provided!");
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an Admin user!");
  }
};

export { protectRoute, admin };
