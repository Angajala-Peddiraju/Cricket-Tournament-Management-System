const Scoreboard = require("../models/scoreboard");
const Player = require("../models/player");

const getScoreboardByMatch = async (req, res) => {

    try {

        const scoreboard = await Scoreboard.findOne({
            match: req.params.matchId
        }).populate({
            path: "match",
            populate: [
                {
                    path: "team1",
                    select: "teamName captain city"
                },
                {
                    path: "team2",
                    select: "teamName captain city"
                }
            ]
        });

        if (!scoreboard) {

            return res.status(404).json({
                success: false,
                message: "Scoreboard Not Found"
            });

        }

        return res.status(200).json({
            success: true,
            scoreboard
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};
const updateScoreboard = async (req, res) => {

    try {

        const { runs, wicket, batsmanId, bowlerId } = req.body;

        const scoreboard = await Scoreboard.findOne({
            match: req.params.matchId
        });

        if (!scoreboard) {
            return res.status(404).json({
                success: false,
                message: "Scoreboard Not Found"
            });
        }

        const batsman = await Player.findById(batsmanId);

        if (!batsman) {
            return res.status(404).json({
                success: false,
                message: "Batsman Not Found"
            });
        }

        const bowler = await Player.findById(bowlerId);

        if (!bowler) {
            return res.status(404).json({
                success: false,
                message: "Bowler Not Found"
            });
        }

        // --------------------
        // SCOREBOARD UPDATE
        // --------------------

        scoreboard.runs += runs;

        if (wicket) {
            scoreboard.wickets += 1;
        }

        scoreboard.balls++;

        if (scoreboard.balls === 6) {
            scoreboard.overs++;
            scoreboard.balls = 0;
        }

        scoreboard.status = "Live";

        // --------------------
        // BATSMAN UPDATE
        // --------------------

        batsman.runs += runs;
        batsman.ballsFaced++;

        if (runs === 4) {
            batsman.fours++;
        }

        if (runs === 6) {
            batsman.sixes++;
        }

        batsman.strikeRate =
            (batsman.runs / batsman.ballsFaced) * 100;

        // --------------------
        // BOWLER UPDATE
        // --------------------

        bowler.runsConceded += runs;

        bowler.ballsBowled++;

        if (wicket) {
            bowler.wickets++;
        }

        if (bowler.ballsBowled === 6) {
            bowler.oversBowled++;
            bowler.ballsBowled = 0;
        }

        if (bowler.oversBowled > 0 || bowler.ballsBowled > 0) {

            const totalOvers =
                bowler.oversBowled +
                (bowler.ballsBowled / 6);

            bowler.economy =
                bowler.runsConceded / totalOvers;
        }

        await scoreboard.save();
        await batsman.save();
        await bowler.save();

        return res.status(200).json({
            success: true,
            message: "Score Updated Successfully",
            scoreboard,
            batsman,
            bowler
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    getScoreboardByMatch,
    updateScoreboard
};