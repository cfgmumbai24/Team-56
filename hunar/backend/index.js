const express = require("express");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
const verifyToken = require("./config/verifyToken");
const tokenCheck = require("./routes/tokenCheck");
const searchRouter = require("./routes/searchRoutes");
const path = require("path");
const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
dotenv.config();
// dotenv.config({ path: "./config/config.env" });
connectDB();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/api/user", require("./routes/authRoutes"));
app.post("/api/verifyToken", verifyToken);
// app.use("/api/search", tokenCheck, searchRouter);

app.use("/api/search", searchRouter);
// app.use("/api/upload", tokenCheck, require("./routes/uploadRoutes"));
app.use("/api/upload", require("./routes/uploadRoutes"));
app.listen(3080, () => {
  console.log("Server is running on port 3080");
});
