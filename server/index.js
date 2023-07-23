/* IMPORTS */

// Modules
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import multer from "multer"
import helmet from "helmet"
import morgan from "morgan"
import path from "path"
import { fileURLToPath } from "url"

// Routes
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"

// Controllers
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";

// Populate database with data (Run only once)
import { addData } from "./data/addData.js";





/* CONFIGURATIONS */

// Module Configurations
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Dotenv
dotenv.config()

// Express App
const app = express()

// Middleware
app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"))
app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

// Local Assets
app.use("/assets", express.static(path.join(__dirname, "public/assets")))





/* MULTER FILE STORAGE */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/assets")
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})
const upload = multer({ storage })





/* ROUTES */

// Routs with files
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

// Main Routes
app.use("/auth", authRoutes)
app.use("/users", userRoutes)
app.use("/posts", postRoutes)





/* MONGOOSE SETUP */

// Assign local port
const PORT = process.env.LOCAL_PORT || process.env.BACKUP_LOCAL_PORT

// Connect to MongoDB
mongoose
    .connect(process.env.LOCAL_MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {

        console.log(`MongoDB Port: ${process.env.LOCAL_MONGO_URL}`)

        // If connection is successful, listen to port
        app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

        /* ADD DATA (USE ONLY ONCE) */
        // addData()
    })
    .catch((error) => console.log(`${error} did not connect`))