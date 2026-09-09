const express = require("express");

const router = express.Router();

const {
    getScoreboardByMatch,
    updateScoreboard
} = require("../controllers/scoreboardController");

const { protect } = require("../middlewares/authMiddlewares");

const authorizeRoles = require("../middlewares/roleMiddleware");

// Anyone logged in can view scoreboard
router.get(
    "/:matchId",
    protect,
    getScoreboardByMatch
);

// Only Admin can update scoreboard
router.put(
    "/:matchId",
    protect,
    authorizeRoles("Admin"),
    updateScoreboard
);

module.exports = router;