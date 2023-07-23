/* IMPORTS */

// Modules
import express from "express";

// Controllers
import { login } from "../controllers/auth.js";





/* CONFIGURATIONS */

// Express Router
const router = express.Router();





/* ROUTES */

router.post("/login", login);



/* EXPORT */

// Export router
export default router;
