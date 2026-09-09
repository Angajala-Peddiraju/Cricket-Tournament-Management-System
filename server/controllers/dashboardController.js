const Team = require("../models/team");
const Player = require("../models/player");
const Match = require("../models/match");
const Scoreboard = require("../models/scoreboard");

const getDashboard = async (req, res) => {

    try {

        const totalTeams = await Team.countDocuments();

        const totalPlayers = await Player.countDocuments();

        const totalMatches = await Match.countDocuments();

        const liveMatches = await Scoreboard.countDocuments({
            status: "Live"
        });

        const completedMatches = await Scoreboard.countDocuments({
            status: "Completed"
        });

        res.status(200).json({
            success: true,
            dashboard: {
                totalTeams,
                totalPlayers,
                totalMatches,
                liveMatches,
                completedMatches
            }
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getDashboard
};
