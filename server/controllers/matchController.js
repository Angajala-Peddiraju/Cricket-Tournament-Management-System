const Match = require("../models/match");
const Team = require("../models/team");
const Scoreboard = require("../models/scoreboard");
const createMatch = async (req, res) => {

    try {

        const { team1, team2, matchDate, venue } = req.body;

        // Team should not play against itself
        if (team1 === team2) {
            return res.status(400).json({
                success: false,
                message: "A team cannot play against itself"
            });
        }

        // Check Team 1
        const firstTeam = await Team.findById(team1);

        if (!firstTeam) {
            return res.status(404).json({
                success: false,
                message: "Team 1 not found"
            });
        }

        // Check Team 2
        const secondTeam = await Team.findById(team2);

        if (!secondTeam) {
            return res.status(404).json({
                success: false,
                message: "Team 2 not found"
            });
        }

        // Create Match
        const match = await Match.create({
            team1,
            team2,
            matchDate,
            venue
        });
        await Scoreboard.create({
    match: match._id
});

        return res.status(201).json({
            success: true,
            message: "Match Created Successfully",
            match
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const getAllMatches = async (req, res) => {

    try {

        const matches = await Match.find()
            .populate("team1", "teamName captain")
            .populate("team2", "teamName captain");

        return res.status(200).json({
            success: true,
            count: matches.length,
            matches
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const getMatchById = async (req, res) => {

    try {

        const match = await Match.findById(req.params.id)
            .populate("team1", "teamName captain city coach")
            .populate("team2", "teamName captain city coach");

        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match Not Found"
            });
        }

        // Find scoreboard for this match
        const scoreboard = await Scoreboard.findOne({
            match: req.params.id
        });

        return res.status(200).json({
            success: true,
            match,
            scoreboard
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const updateMatch = async (req, res) => {

    try {

        const { team1, team2 } = req.body;

        // If both teams are being updated, they cannot be the same
        if (team1 && team2 && team1 === team2) {
            return res.status(400).json({
                success: false,
                message: "A team cannot play against itself"
            });
        }

        const match = await Match.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )
        .populate("team1", "teamName captain")
        .populate("team2", "teamName captain");

        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Match Updated Successfully",
            match
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const deleteMatch = async (req, res) => {

    try {

        const match = await Match.findByIdAndDelete(req.params.id);

        if (!match) {

            return res.status(404).json({
                success: false,
                message: "Match Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Match Deleted Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    createMatch,
    getAllMatches,
    getMatchById,
    updateMatch,
    deleteMatch
};

