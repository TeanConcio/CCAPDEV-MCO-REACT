/* IMPORTS */

// Modules
import express from "express";

// Controllers
import { 
    validateCommentId,
    getPostComments,
    upvoteComment,
    downvoteComment,
    deleteComment
} from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";





/* CONFIGURATIONS */

// Express Router
const router = express.Router();





/* ROUTES */

// Read
// router.get("/commentId", verifyToken, validateCommentId, getComment);
router.get("/:parentId/comments", verifyToken, getPostComments);

// Update
router.patch("/:commentId/upvote", verifyToken, validateCommentId, upvoteComment);
router.patch("/:commentId/downvote", verifyToken, validateCommentId, downvoteComment);

// Delete
router.delete("/:commentId", verifyToken, validateCommentId, deleteComment);





/* EXPORT */

// Export router
export default router;