import { Schema , model } from "mongoose";



const UserSchema = new Schema({
    firstName : String,
    lastName : String,
    age : Number,
    city : String,
    country : String,
    email : String,
    passwordHash : String,
    images :[String],
    bio : String,
    interests : [String],
    skills : [String],

})

const UserCollection = model("UserCollection",UserSchema);

export default UserCollection;
