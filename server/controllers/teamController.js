const Team = require("../models/team");

const createTeam = async (req, res) => {
    try {

        const {
            teamName,
            captain,
            coach,
            city,
            owner
        } = req.body;

        const team = await Team.create({
            teamName,
            captain,
            coach,
            city,
            owner
        });

        return res.status(201).json({
            success: true,
            message: "Team Created Successfully",
            team
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const getAllTeams = async (req, res) => {

    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;

        const skip = (page - 1) * limit;

        const teams = await Team.find()
            .skip(skip)
            .limit(limit);

        const totalTeams = await Team.countDocuments();

        return res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(totalTeams / limit),
            totalTeams,
            count: teams.length,
            teams
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const getTeamById = async (req, res) => {
    try {

        const team = await Team.findById(req.params.id);

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team Not Found"
            });
        }

        res.status(200).json({
            success: true,
            team
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};
const updateTeam = async (req, res) => {

    try {

        const team = await Team.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Team Updated Successfully",
            team
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const deleteTeam = async (req, res) => {

    try {

        const team = await Team.findByIdAndDelete(req.params.id);

        if (!team) {
            return res.status(404).json({
                success: false,
                message: "Team Not Found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Team Deleted Successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const searchTeams = async (req, res) => {

    try {

        const { keyword } = req.query;

        const teams = await Team.find({
            teamName: {
                $regex: keyword,
                $options: "i"
            }
        });

        return res.status(200).json({
            success: true,
            count: teams.length,
            teams
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
module.exports = {
    createTeam,
    getAllTeams,
    getTeamById,
    updateTeam,
    deleteTeam,
    searchTeams
};