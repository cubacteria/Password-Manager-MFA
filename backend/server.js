const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const vaultRoutes = require("./routes/passwords");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();
app.use(cors());
app.use(express.json());

app.use("/", authRoutes);
app.use("/api/vault", vaultRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
