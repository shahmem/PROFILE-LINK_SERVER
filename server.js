const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const connectDB = require('./config/db');
connectDB();

const UserRoutes = require("./routes/user");
const LinkRoutes = require("./routes/links");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/profiles", UserRoutes);
app.use("/api", LinkRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
