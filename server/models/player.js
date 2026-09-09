const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
{
    // Basic Information
    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    jerseyNumber: {
        type: Number,
        required: true
    },

    role: {
        type: String,
        enum: ["Batsman", "Bowler", "All-Rounder", "Wicket Keeper"],
        required: true
    },

    battingStyle: {
        type: String
    },

    bowlingStyle: {
        type: String
    },

    // Batting Statistics
    runs: {
        type: Number,
        default: 0
    },

    ballsFaced: {
        type: Number,
        default: 0
    },

    fours: {
        type: Number,
        default: 0
    },

    sixes: {
        type: Number,
        default: 0
    },

    strikeRate: {
        type: Number,
        default: 0
    },

    // Bowling Statistics
    wickets: {
        type: Number,
        default: 0
    },

    oversBowled: {
        type: Number,
        default: 0
    },

    ballsBowled: {
        type: Number,
        default: 0
    },

    runsConceded: {
        type: Number,
        default: 0
    },

    economy: {
        type: Number,
        default: 0
    },

    // Team Reference
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Player", playerSchema);