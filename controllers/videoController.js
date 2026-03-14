import Video from "../models/videoModel.js";
import path from "path";
import fs from "fs";

export const addVideo = async (req, res) => {
  try {
    const filePath = req.files && req.files.video ? req.files.video.path : null;

    if (!filePath) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Video file is required",
      });
    }

    const newVideo = new Video({
      filePath,
    });

    const savedVideo = await newVideo.save();

    res.status(201).json({
      success: true,
      error: false,
      message: "New video is added",
      data: savedVideo,
    });
  } catch (error) {
    console.error("Error adding video:", error);

    res.status(500).json({
      success: false,
      error: true,
      message: "There was an error while adding video",
    });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const videoId = req.params.id;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video not found",
      });
    }

    const videoPath = video.filePath;
    const fileStream = fs.createReadStream(videoPath);

    // Set the appropriate headers
    res.setHeader("Content-Type", "video/mp4");
    res.setHeader("Content-Disposition", `attachment; filename="${path.basename(videoPath)}"`);

    // Pipe the file stream to the response
    fileStream.pipe(res);
  } catch (error) {
    console.error("Error fetching video:", error);
    res.status(500).json({
      success: false,
      message: "There was an error while fetching the video",
    });
  }
};
