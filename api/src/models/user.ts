import mongoose from "mongoose";
import { Schema } from "mongoose";

export interface userInter extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<userInter>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
},
{
    timestamps: true
});

const User = mongoose.model<userInter>("User", userSchema)

export default User