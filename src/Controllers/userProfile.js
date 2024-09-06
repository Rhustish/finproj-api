import UserCollection from "../Models/User.js";

const userProfileController = async (req,res) =>{
    if(!req.userId){
        return res.status(401).send("Bad request");
    }

    try{
        const user = await UserCollection.findById(req.userId);
        res.status(200).send({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            city: user.city,
            country: user.country,
            dob : user.dob
        })
    }
    catch(err){
        res.status(400).send(err);
    }
}

export default userProfileController;