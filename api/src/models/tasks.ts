import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true

    },
    description:{
        type:String,
        required:true,
        trim:true

    },
    dueDate:{
        type:String,
        required:true,
     

    },
    category:{
        type:String,
        required:true,
        trim:true

    },
    completed:{
        type:Boolean,
        required:true,
        default:false

    },
})

const Task = mongoose.model("Task", taskSchema)

export default Task