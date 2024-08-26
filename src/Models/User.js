import { Schema , model } from "mongoose";

const UserSchema = new Schema({
    firstName : String,
    lastName : String,
    dob : String,
    city : String,
    country : String,
    email : String,
    passwordHash : String
})

const UserCollection = model("UserCollection",UserSchema);

export default UserCollection;