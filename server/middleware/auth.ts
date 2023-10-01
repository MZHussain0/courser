import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import ErrorHandler from "../utils/ErrorHandler";
import { CatchAsynErrorHandler } from "../utils/asynErrorHandler";
import { redis } from "../utils/redis";

export const isAuthenticated = CatchAsynErrorHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = await req.cookies.accessToken;
    console.log("🚀 ~ file: auth.ts:10 ~ accessToken:", accessToken);
    if (!accessToken) {
      return next(
        new ErrorHandler("Please login to access this resource", 401)
      );
    }

    const decoded = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    ) as JwtPayload;
    if (!decoded) {
      return next(new ErrorHandler("Access token is not valid", 401));
    }

    const user = await redis.get(decoded.id);
    if (!user) {
      return next(new ErrorHandler("User not found", 401));
    }

    req.user = JSON.parse(user);
    next();
  }
);

// validate user role
export const authorisedRoles = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role || "")) {
      return next(
        new ErrorHandler(
          `Role: ${req.user?.role} is not allowed to access this resource`,
          403
        )
      );
    }
    next();
  };
};
