const mongoose = require("mongoose");

const scoreboardSchema = new mongoose.Schema(
{
    match: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Match",
        required: true,
        unique: true
    },

    runs: {
        type: Number,
        default: 0
    },

    wickets: {
        type: Number,
        default: 0
    },

    overs: {
        type: Number,
        default: 0
    },

    balls: {
        type: Number,
        default: 0
    },

    innings: {
        type: Number,
        default: 1
    },

    status: {
        type: String,
        enum: ["Not Started","Live","Completed"],
        default: "Not Started"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Scoreboard",scoreboardSchema);