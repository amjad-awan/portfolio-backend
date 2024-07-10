import multer from "multer";
import path from "path";
import { addVideo, getVideoById } from "../controllers/videoController.js";
// Route handler
import express from "express";
const router = express.Router();
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});
const upload = multer({ storage: storage });


// Route to handle video creation
router.post("/add-video", upload.single("video"), addVideo);
router.get("/get-video/:id", getVideoById);



export default router;
