const router = require ("express").Router();
const Application = require ("../models/application");
const mongoose = require ("mongoose");
//add an application
router.post("/add",async(req,res)=>{
    const {jobTitle,companyName,description,status} = req.body;
    try{
        const newApplication = new Application({
            jobTitle,
            companyName,
            description,
            status,
            user:req.userId,
        });
        const saveApplication = await newApplication.save();
        res.status(500).json({message:"successfully saved the application"});
    }catch(err){
        res.status(500).json({message:"server error ", err});
    }
});


//get all application
router.get("/",async (req,res)=>{
    try{
        const applications = await Application.find({user : req.userId});
        res.status(200).json(applications);
    }catch(err){
        res.status(500).json({ message: 'Server error', err });
    }
});


//update application
router.put("/edit",async(req,res)=>{
    const {jobTitle,companyName,description,status} = req.body;
    try{
        const updateApplication = await Application.findByIdAndUpdate(req.userId,{
            jobTitle,
            companyName,
            description,
            status
        },{ new: true, runValidators: true });

        if (!updateApplication) {
            return res.status(404).json({ message: "Application not found" });
        }
        res.status(200).json("succesfully updated the application");
    }catch(err){
        res.status(500).json({ message: 'Server error', err});
    }
});

//find by match
router.get("/search", async (req, res) => {
    const { query: keyword } = req.query;
    try {
        const applications = await Application.find({ user: req.userId });
        const filteredApplications = applications.filter(application => {
            return (
                application.jobTitle.toLowerCase().includes(keyword.toLowerCase()) ||
                application.companyName.toLowerCase().includes(keyword.toLowerCase()) ||
                application.description.toLowerCase().includes(keyword.toLowerCase()) ||
                application.status.toLowerCase().includes(keyword.toLowerCase())
            );
        });
        res.status(200).json(filteredApplications);
    } catch (err) {
        res.status(500).json({ message: "Server error", err });
    }
});


//delete


router.delete("/delete", async (req, res) => {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
        return res.status(400).json({ message: "No application Id provided" });
    }

    try {
        const validIds = ids.every(id => mongoose.Types.ObjectId.isValid(id));

        if (!validIds) {
            return res.status(400).json({ message: "Invalid Application Id(s)" });
        }

        const result = await Application.deleteMany({ _id: { $in: ids }, user: req.userId });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No application found or you don't have the permission!" });
        }
        res.status(200).json({ message: "Applications deleted successfully" });
    } catch (err) {
        console.error("Error:", err); // Log any errors for debugging
        res.status(500).json({ message: "Server error", error: err });
    }
});

module.exports = router;