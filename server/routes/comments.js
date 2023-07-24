/* IMPORTS */

// Modules
import express from "express";

// Controllers
import { 
    validateCommentId,
    getComment,
    getPostComments,
    upvoteComment,
    downvoteComment,
    updateComment,
    deleteComment
} from "../controllers/comments.js";
import { verifyToken } from "../middleware/auth.js";





/* CONFIGURATIONS */

// Express Router
const router = express.Router();





/* ROUTES */

// Read
router.get("/commentId", verifyToken, validateCommentId, getComment);
router.get("/:postId/comments", verifyToken, getPostComments);

// Update
router.patch("/:commentId/upvote", verifyToken, validateCommentId, upvoteComment);
router.patch("/:commentId/downvote", verifyToken, validateCommentId, downvoteComment);
router.patch("/:commentId", verifyToken, validateCommentId, updateComment);

// Delete
router.delete("/:commentId", verifyToken, validateCommentId, deleteComment);





/* EXPORT */

// Export router
export default router;