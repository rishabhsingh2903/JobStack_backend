const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const { Schema } = mongoose;

const applicationSchema = new mongoose.Schema({
    jobTitle:{
        type:String,
        required:true,
        max:50
    },
    companyName:{
        type:String,
        required:true,
    },
    applicationDate:{
        type:Date,
        default:Date.now
    },
    description: {
        type: String,
    },
    status:{
        type:String,
        default:"Pending"
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true,
}
);


const encKey = process.env.ENC_KEY;// Your 32-byte encryption key
const sigKey = process.env.SIG_KEY; // Your 64-byte signing key


applicationSchema.plugin(encrypt,{
    encryptionKey:encKey,
    signingKey:sigKey,
    encryptedFields:['jobTitle','companyName', 'description', 'status', 'applicationDate']
})

const Application = mongoose.model("Application",applicationSchema);

module.exports = Application;