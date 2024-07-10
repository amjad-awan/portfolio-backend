import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
// import userRoute from "./routes/userRoutes.js";
import photoRoute from "./routes/photoRoutes.js";
import projectRoute from "./routes/projectRoutes.js";
import videoRoute from "./routes/videoRoutes.js";
import blogRoutes from './routes/blogRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./db.js";
import { nodeMailer } from "./controllers/nodeMail.js";
dotenv.config();
connectDB();
// Initialize Express app
const app = express();
// Set up middleware
app.use(cors())
app.use(express.json());
app.use(bodyParser.urlencoded({imit: '50000000', extended: true}));



// Convert __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Define routes
app.post("/api/v1/send-mail",nodeMailer );
app.use("/api/v1/photo",photoRoute );
app.use("/api/v1/video", videoRoute);
app.use("/api/v1/project", projectRoute);
app.use('/api/v1/blog', blogRoutes);

// Define a default route
app.get("/", (req, res) => {
  res.send("Express API is running");
});

// Set the port to listen on
const PORT = process.env.PORT || 5000;
// Start the server
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
