const express = require("express");

const router = express.Router();

const { createMatch,getAllMatches,getMatchById,updateMatch,deleteMatch } = require("../controllers/matchController");

const { protect } = require("../middlewares/authMiddlewares");

const authorizeRoles = require("../middlewares/roleMiddleware");

router.post(
    "/",
    protect,
    authorizeRoles("Admin"),
    createMatch
);
router.get("/", getAllMatches);
router.get("/:id", getMatchById);
router.put(
    "/:id",
    protect,
    authorizeRoles("Admin"),
    updateMatch
);
router.delete(
    "/:id",
    protect,
    authorizeRoles("Admin"),
    deleteMatch
);

module.exports = router;