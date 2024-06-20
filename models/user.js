const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        max: 20,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    applications: [{
        type: Schema.Types.ObjectId,
        ref: "Application"
    }]
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
