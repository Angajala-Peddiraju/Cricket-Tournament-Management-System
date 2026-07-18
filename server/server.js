require('dotenv').config();
const authRoutes = require("./routes/authRoutes");
const connectDB = require('./config/db');
const express=require('express');
const app=express();
app.use(express.json());
const port=process.env.PORT || 5000;

connectDB();


app.use('/api/auth', authRoutes);

app.get('/',(req,res)=>{
    res.send('Cricket Management System Backend is running..');
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});