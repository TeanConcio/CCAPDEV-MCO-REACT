/* IMPORTS */

// Modules
import express from "express";

// Controllers
import { 
    validatePostId,
    getFeedPosts,
    getUserPosts,
    upvotePost,
    downvotePost,
    updatePost,
    deletePost
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";





/* CONFIGURATIONS */

// Express Router
const router = express.Router();





/* ROUTES */

// Read
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

// Update
router.patch("/:postId/upvote", verifyToken, validatePostId, upvotePost);
router.patch("/:postId/downvote", verifyToken, validatePostId, downvotePost);
router.patch("/:postId", verifyToken, validatePostId, updatePost);

// Delete
router.delete("/:postId", verifyToken, validatePostId, deletePost);





/* EXPORT */

// Export router
export default router;