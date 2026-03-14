import mongoose from "mongoose";
// Define a schema for the form data
const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    photoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Photo",
      required: true,
    },

    comments: [
      {
        username: { type: String, required: true },
        comment: { type: String, required: true },
        email:{ type: String, required: true },
        date: { type: Date, default: Date.now },
        replies: [
          {
            username: { type: String, required: true },
            comment: { type: String, required: true },
            date: { type: Date, default: Date.now },
          },
        ],
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },

  {
    timestamps: true,
  }
);

// Create a model based on the schema
export default mongoose.model("Blog", blogSchema);
