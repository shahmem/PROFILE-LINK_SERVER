const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const UserRoutes = require("./routes/user");
const LinkRoutes = require("./routes/links");

const app = express();


app.use(cors({
  origin: ["http://localhost:5173", "https://profile-link-client.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));


app.use(express.json());

app.use("/api/profiles", UserRoutes);
app.use("/api", LinkRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
