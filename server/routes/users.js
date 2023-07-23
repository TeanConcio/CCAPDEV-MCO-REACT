/* IMPORTS */

// Modules
import express from "express";

// Controllers
import { verifyToken } from "../middleware/auth.js";
import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js";





/* CONFIGURATIONS */

// Express Router
const router = express.Router();





/* ROUTES */

// Read
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

// Update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);





/* EXPORT */

// Export router
export default router;