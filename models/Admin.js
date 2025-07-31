import mongoose from "mongoose";

const AdminSchema= mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true}
})

export const Admin=mongoose.models.admin || mongoose.model("admin",AdminSchema)