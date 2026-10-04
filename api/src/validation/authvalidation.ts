import { regex, z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  email: z.string().email("Invalid email format").toLowerCase(),
  password: z.string().min(8, "Password must be at least 8 characters").regex(/[A-Z]/).regex(/[a-z]/).regex(/[0-9]/).regex(/[^A-Za-z0-9]/)
});


export const loginSchema = z.object({
    email: z.email().toLowerCase(),
    password: z.string().min(8, " Incorrect Password") 
})