import type {Request,Response,NextFunction} from "express"
import jwt from "jsonwebtoken";


interface JwtPayload {
   userId: string;
}

export const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
   const authHeader = req.headers.authorization;
   if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
         success:false,
         message:"Authentication is required"
      })
   }
   const token = authHeader.split(" ")[1];
   if (!token) {
      return res.status(401).json({
         success:false,
         message:"Token is missing"
      })
   }
   try {
    const JWT_SECRET = process.env.JWT_SECRET as string;

    if (!JWT_SECRET) {
      return res.status(500).json({
         success:false,
         message:"JWT secret is not defined"
      })
    }

    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.userId = decoded.userId;
    next();
   } catch (error) {
      return res.status(401).json({
         success:false,
         message:"Invalid token"
      })
   }
}