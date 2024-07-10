import mongoose from "mongoose";
// const URL="mongodb://localhost:27017/my-portfolio"
const URL="mongodb+srv://amjadmalikf53:kaqayDsMU3aSH31S@cluster0.txh8een.mongodb.net/portfolio?retryWrites=true&w=majority&appName=Cluster0"
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(URL,{
      useNewUrlParser: true, // Use the new URL parser
      useUnifiedTopology: true, // Use the new Unified Topology engine
      serverSelectionTimeoutMS: 50000,
    });
    console.log(
      `data base is connected to host ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Error in db ${error}`);
  }
};
export default connectDB;