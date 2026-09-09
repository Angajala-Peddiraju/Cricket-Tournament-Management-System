const mongoose = require("mongoose");

const matchSchema = new mongoose.Schema(
{
    team1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },

    team2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },

    matchDate: {
        type: Date,
        required: true
    },

    venue: {
        type: String,
        required: true
    },

    status: {
        type: String,
        enum: ["Upcoming", "Live", "Completed"],
        default: "Upcoming"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Match", matchSchema);