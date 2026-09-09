const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true
    },

    email:{
        type:String,
        required:true,
        unique:true
    },

    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["Admin","TeamManager","Scorer","Viewer"],
        default:"Viewer"
    }

},
{
    timestamps:true
});

module.exports = mongoose.models.User || mongoose.model("User",userSchema);