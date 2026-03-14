import mongoose from "mongoose";

// Define a schema for the video data
const videoSchema = new mongoose.Schema({
  filePath: { type: String, required: true }, // Path to the video file
  uploadedAt: { type: Date, default: Date.now }, // Timestamp of when the video was uploaded
});

// Create a model based on the schema
const Video = mongoose.model("Video", videoSchema);

export default Video;
