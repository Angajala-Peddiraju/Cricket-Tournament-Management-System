const express = require("express");

const router = express.Router();


const { createPlayer,getAllPlayers,getPlayerById,updatePlayer,deletePlayer,searchPlayers } = require("../controllers/playerController");

const { protect } = require("../middlewares/authMiddlewares");

const authorizeRoles = require("../middlewares/roleMiddleware");
router.get("/", getAllPlayers);

router.post(
    "/",
    protect,
    authorizeRoles("Admin", "TeamManager"),
    createPlayer
);
router.get("/", getAllPlayers);
router.get("/search", searchPlayers);
router.get("/:id", getPlayerById);
router.put(
    "/:id",
    protect,
    authorizeRoles("Admin", "TeamManager"),
    updatePlayer
);
router.delete(
    "/:id",
    protect,
    authorizeRoles("Admin", "TeamManager"),
    deletePlayer
);

module.exports = router;
