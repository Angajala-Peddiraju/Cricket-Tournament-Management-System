require('dotenv').config();
const authRoutes = require("./routes/authroutes");
const connectDB = require('./config/db');
const express=require('express');
const cors = require("cors");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");
const matchRoutes = require("./routes/matchRoutes");
const scoreboardRoutes = require("./routes/scoreboardRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const app=express();
app.use(express.json());
app.use(cors({
  origin: [
    "https://cricket-tournament-frontend-3an0.onrender.com",
    "http://localhost:5173"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
const port=process.env.PORT || 5000;

connectDB();


app.use('/api/auth', authRoutes);
app.use('/api/teams', teamRoutes);
app.use("/api/players", playerRoutes);

app.use("/api/matches", matchRoutes);
app.use("/api/scoreboards", scoreboardRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.get('/',(req,res)=>{
    res.send('Cricket Management System Backend is running..');
});

app.listen(port,()=>{
    console.log(`Server is running on http://localhost:${port}`);
});