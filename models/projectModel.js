import mongoose from "mongoose";
// Define a schema for the form data
const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  link: { type: String, required: true },
  description: { type: String, required: true },
  cardSpan: { type: String, required: true },
  techStack: {
    type: Array,
  },
  
  feature: {
    type: Array,
  },
  photoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Photo",
    required: true,
  },
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Video",
    required: true,
  },
}, 

{
  timestamps: true
}

);

// Create a model based on the schema
export default mongoose.model("project", projectSchema);
