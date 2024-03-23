import User from "../models/user.model.js";

export const getUsers = async (req, res, next) =>{
    try {
        const loggedInUserId = req.user._id;

        // find all users other than loggedInUserId 
        const otherUsers = await User.find({_id: { $ne: loggedInUserId}}).select("-password");
        res.status(200).json(otherUsers);
    } catch (error) {
        console.log("error in getUsers controller: --->", error.message);
        res.status(500).json({ error: "Internal Server Error" })
    }
}