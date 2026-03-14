import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    
    name: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      require: true,
      default:"admin"
    },
  },
 
);

export default mongoose.model("user", userSchema);