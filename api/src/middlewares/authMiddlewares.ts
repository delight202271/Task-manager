import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Defines the structure of the data stored inside the JWT payload
interface JwtPayload {
  userId: string;
}

// Authentication middleware
// This middleware checks whether the user has a valid JWT before
// allowing the request to continue to a protected route.
export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Get the Authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the Authorization header exists and uses the Bearer format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Authentication is required",
    });
  }

  // Extract the token from "Bearer <token>"
  const token = authHeader.split(" ")[1];

  // Make sure a token was actually provided
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Token is missing",
    });
  }

  try {
    // Get the secret key used to sign and verify JWTs
    const JWT_SECRET = process.env.JWT_SECRET as string;

    // Make sure the JWT secret exists in the environment variables
    if (!JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT secret is not defined",
      });
    }

    // Verify the token using the JWT secret
    // If valid, the decoded payload contains the user's ID
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

    // Store the authenticated user's ID on the request object
    // Controllers can use req.userId to identify the logged-in user
    req.userId = decoded.userId;

    // Allow the request to continue to the next middleware/controller
    next();
  } catch (error) {
    // If the token is invalid, expired, or cannot be verified,
    // reject the request as unauthorized
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};