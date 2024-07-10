import projectModel from "../models/projectModel.js";

export const addProject = async (req, res) => {
  try {
    const { title, type, link, description,cardSpan, techStack,videoId, photoId, feature } = req.body;

    const newPorject = new projectModel({
      title,
      type,
      description,
      techStack,
      feature,
      photoId,
      cardSpan,
      link,
      videoId
    });

    const savedProject = await newPorject.save();
    res.status(201).json({
      success: true,
      error: false,
      message: "New Project is added",
      data: savedProject,
    });
  } catch (error) {
    console.error("Error adding project:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "There was an error while adding project",
    });
  }
};
export const getSingleProject = async (req, res) => {
  try {
    // Extract query parameters
    const { id } = req.params;

    const project = await projectModel.findOne({ _id: id });

    res.status(200).json({
      success: true,
      error: false,
      data: project,
      message: "Project fetched",
    });
  } catch (error) {
    console.error("Error fetching project:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "There was an error while fetching project",
    });
  }
};
export const getProjects = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const options = {
      limit: parseInt(limit)
    };
    const projects = await projectModel.find({}, null, options);

    res.status(200).json({
      success: true,
      error: false,
      data: projects,
        message: "project fetched",
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    res.status(500).json({
      success: false,
      error: true,
      message: "There was an error while fetching projects",
    });
  }
};
