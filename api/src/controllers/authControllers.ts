import { signUpSchema,loginSchema } from "../validation/authvalidation.js";
import type {Request,Response} from "express"
import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


 export const signUp = async(req:Request, res:Response)=>{
 console.log("Signup");
 
 
const result = signUpSchema.safeParse(req.body)

if (!result.success) {
   return res.status(400).json({
    success:false,
    message:"Invalid input",
    error:result.error,
   }) 
}

const {name,email,password} = result.data

try {
   const existingUser = await User.findOne({email})
   if (existingUser) {
    return res.status(409).json({
        success:false,
        message:"Email already in use"
    })
   }
    const hashedPassword = await bcrypt.hash(password, 10)
   const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
   })
   await newUser.save()

   return res.status(201).json({
    success:true,
    message:"Account created successfully",
     
    user:{
       name:newUser.name,
       email:newUser.email,   
       id:newUser._id
    }


   })

} catch (error:any) {
  return res.status(500).json({
    success:false,
    message:"Internal server error",
    error:error.message
  })  
}

}

export const login = async(req:Request,res:Response)=>{
    const result = loginSchema.safeParse(req.body)

    if (!result.success) {
        return res.status(400).json({
            success:false,
            message:"Invalid input",
            error:result.error
        })
    }

    const {email,password} = result.data

    try {
        const user = await User.findOne({email}) 
        if (!user) {
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }   

        const isPasswordValid = await bcrypt.compare(password,user.password)
        if (!isPasswordValid) {
            return res.status(401).json({
                success:false,
                message:"Invalid credentials"
            })
        }

        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET as string, {expiresIn:"1h"})
        return res.status(200).json({
            success:true,
            message:"Login successful",
            token,
            user:{
                name:user.name,
                email:user.email,
                id:user._id
            }
        })
    } catch (error:any) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message
        })
    }
}
