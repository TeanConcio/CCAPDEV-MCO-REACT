/* IMPORTS */

// Modules
import express from "express";

// Controllers
import { 
    validatePostId,
    getPost,
    getFeedPosts,
    getUserPosts,
    getNextPrevPostIds,
    getSearchPosts,
    upvotePost,
    downvotePost,
    deletePost
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";





/* CONFIGURATIONS */

// Express Router
const router = express.Router();





/* ROUTES */

// Read
router.get("/view/:postId", verifyToken, validatePostId, getPost);
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:postId/next-prev-ids", verifyToken, getNextPrevPostIds)
router.get("/search", verifyToken, getSearchPosts);

// Update
router.patch("/:postId/upvote", verifyToken, validatePostId, upvotePost);
router.patch("/:postId/downvote", verifyToken, validatePostId, downvotePost);

// Delete
router.delete("/:postId", verifyToken, validatePostId, deletePost);





/* EXPORT */

// Export router
export default router;