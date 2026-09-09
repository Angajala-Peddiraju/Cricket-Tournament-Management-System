const Player = require("../models/player");
const Team = require("../models/team");
const createPlayer = async (req, res) => {

    try {

        const {
            name,
            age,
            jerseyNumber,
            role,
            battingStyle,
            bowlingStyle,
            team
        } = req.body;

        // Check whether the team exists
        const teamExists = await Team.findById(team);

        if (!teamExists) {
            return res.status(404).json({
                success: false,
                message: "Team Not Found"
            });
        }

        // Create Player
        const player = await Player.create({
            name,
            age,
            jerseyNumber,
            role,
            battingStyle,
            bowlingStyle,
            team
        });

        return res.status(201).json({
            success: true,
            message: "Player Added Successfully",
            player
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const getAllPlayers = async (req, res) => {

    try {
const players = await Player.find().populate("team");

        return res.status(200).json({
            success: true,
            count: players.length,
            players
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const searchPlayers = async (req, res) => {

    try {

        const { keyword } = req.query;

        const players = await Player.find({
            name: {
                $regex: keyword,
                $options: "i"
            }
        }).populate("team", "teamName");

        return res.status(200).json({
            success: true,
            count: players.length,
            players
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const getPlayerById = async (req, res) => {

    try {

        const player = await Player.findById(req.params.id)
            .populate("team", "teamName captain");

        if (!player) {

            return res.status(404).json({
                success: false,
                message: "Player Not Found"
            });

        }

        res.status(200).json({
            success: true,
            player
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const updatePlayer = async (req, res) => {

    try {

        const player = await Player.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate("team", "teamName captain");

        if (!player) {

            return res.status(404).json({
                success: false,
                message: "Player Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Player Updated Successfully",
            player
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const deletePlayer = async (req, res) => {

    try {

        const player = await Player.findByIdAndDelete(req.params.id);

        if (!player) {

            return res.status(404).json({
                success: false,
                message: "Player Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            message: "Player Deleted Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    createPlayer,
    getAllPlayers,
    getPlayerById,
    updatePlayer,
    deletePlayer,
    searchPlayers
};