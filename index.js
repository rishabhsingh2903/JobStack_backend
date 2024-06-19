const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require('cors');
app.use(cors());
const userRoute = require("./Routes/users");
const authRoute = require("./Routes/auth");
const appRoute = require("./Routes/applications");
const authenticateToken = require("./middleware/authMiddleware");





mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true,useUnifiedTopology:true })
    .then(()=>{
        console.log("connect to the database");
    })
    .catch((err)=>{
        console.log(err);
    })

//middleware

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));

app.use("/api/users",authenticateToken,userRoute);
app.use("/api/auth",authRoute);
app.use("/api/applications",authenticateToken,appRoute);



app.listen(8000,()=>{
    console.log("backend server running!!!");
});