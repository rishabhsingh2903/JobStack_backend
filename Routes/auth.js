const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

router.get("/",(req,res)=>{
    console.log("auth route");
})


router.post("/register",async (req,res)=>{
    const {username,email,password}=req.body;

    try{
        const existingUser = await User.findOne({email});
        if (existingUser){
           return res.status(400).json({message:"Email already in use."});

        }
    
        const salt = await bcrypt.genSalt(10);
        const hashpassword= await bcrypt.hash(password,salt);
        

        const newUser = new User({
            username,
            email,
            password:hashpassword
        });
        const user = await newUser.save();
        res.status(201).json({message:"New user registered Successfully"});
    } catch(err){
        res.status(500).json({ message: "Server error", err });
    }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json("User not found");

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) return res.status(400).json("Wrong password");

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json(err);
    }
});


module.exports = router;