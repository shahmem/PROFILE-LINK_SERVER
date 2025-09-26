const mongoose = require('mongoose');

const mongoURI ="mongodb+srv://shahmem7080:JssXVtoEi00Sgjvi@cluster0.yojyowc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  if (!mongoURI) {
    console.error("MongoDB URI is not defined in .env");
    process.exit(1);
  }

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Successfully!");
  } catch (err) {
    console.error("MongoDB Connection Failed:", err);
    process.exit(1);
  }
};

module.exports = connectDB;
