const express = require("express");
const mysql = require("mysql");
const connectDB = require("./config/database");
const dotenv = require("dotenv");
const cors = require("cors");
const verifyToken = require("./config/verifyToken");
const tokenCheck = require("./routes/tokenCheck");
const searchRouter = require("./routes/searchRoutes");
const path = require("path");
const { hostname } = require("os");
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

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "somesh",
  database: "urjahunar",
});
app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
// app.use("/student", express.static(path.join(__dirname, "./uploads")));
app.use("/api/student", require("./routes/studentRoutes"));
app.post("/api/verifyToken", verifyToken);
// app.use("/api/search", tokenCheck, searchRouter);

app.use("/api/search", searchRouter);
// app.use("/api/upload", tokenCheck, require("./routes/uploadRoutes"));
app.use("/api/upload", require("./routes/studentRoutes"));
app.listen(3080, () => {
  console.log("Server is running on port 3080");
});
