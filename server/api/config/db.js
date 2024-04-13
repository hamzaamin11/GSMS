const mongoose = require("mongoose");

console.log("8888", process.env.MONGO);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("mongo", err.message);
    // Exit process with failure: "1" is failure code, while "0" is normal exit code
    process.exit(1);
  }
};

module.exports = { connectDB };
