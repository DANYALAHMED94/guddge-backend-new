import mongoose from "mongoose";

const connectDb = async (MONGO_DB) => {
  try {
    await mongoose.connect(MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is connected");
    return true;
  } catch (error) {
    console.log(error.message);
  }
};
export default connectDb;
