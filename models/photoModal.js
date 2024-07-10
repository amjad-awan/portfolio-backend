import mongoose from "mongoose";
const photoSchema = new mongoose.Schema({
  photo: { data: Buffer, contentType: String },
});

export default mongoose.model("Photo", photoSchema);
