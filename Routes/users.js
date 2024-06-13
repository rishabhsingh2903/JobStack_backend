const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");


//fetching user details
router.get("/profile",async(req,res)=>{
    const userId=req.userId;
    try{
        const user = await User.findById(userId);
        if(!user) {
            return res.status(404).json({message:"user not found"});
        }
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({ message: "Server error", error: err });
    }

});


//updating user details
router.put("/update",async(req,res)=>{
    const {username,email,password}= req.body;
    try{
        const user = await User.findById(req.userId);
        if (!user){
            return res.status(404).json({message:"User not found"});
        }

        if(email && email!==user.email){
            const checkIfExist = await User.findOne({email});
            if (checkIfExist){
                return res.status(400).json({message:"email already in use!"});
            }
        }

        if(username) user.username = username;
        if(email) user.email = email;
        if(password) user.password = bcrypt.hash(password,10);

        await user.save();
        res.status(200).json({ message: "User updated successfully" });
    }catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
});



//delete user profile
router.delete("/delete",async(req,res)=>{

    try{
        const user = await User.findByIdAndDelete(req.userId);
        if(!user){
            return res.status(404),json({message:"User not found"});
        }
        res.status(200).json({message:"user deleted successfully"});
    }catch(err){
        res.status(500).json({ message: "Server error", error: err });
    }

    
});



module.exports= router;