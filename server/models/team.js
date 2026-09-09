const mongoose = require("mongoose");

const teamSchema = new mongoose.Schema(
{
    teamName: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    teamLogo: {
        type: String,
        default: ""
    },

    captain: {
        type: String,
        required: true
    },

    coach: {
        type: String,
        default: ""
    },

    city: {
        type: String,
        required: true
    },

    owner: {
        type: String,
        default: ""
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

},
{
    timestamps: true
});

module.exports = mongoose.model("Team", teamSchema);