import mongoose from "mongoose";

const connnectDb = async (MONDO_DB) => {
  try {
    await mongoose.connect(MONDO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("database is connected");
    return true;
  } catch (error) {
    console.log(error?.message);
  }
};

export default connnectDb;
