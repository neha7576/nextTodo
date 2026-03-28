import mongoose, { models, Schema } from "mongoose";


const TodoSchema = new Schema(
    {
        title : {type:String, required:true},
        description :{type : String,required:true},
        userId : {type: mongoose.Schema.Types.ObjectId,ref:"User",required:true}
    }  , 
    {timestamps : true}
);

export const Todo = models.Todo || mongoose.model("Todo",TodoSchema);
