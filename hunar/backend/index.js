const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const teacherRoutes = require("./routes/teacher");
const studentRoutes = require("./routes/student");
const scoreRoutes = require("./routes/score");
const studentReport = require("./routes/studentReport");
const loginRoute = require("./routes/loginRoute");
const registerRoute = require("./routes/registerRoute");
const avgRoutes = require("./routes/avgRoutes");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use("/api/teacher", teacherRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/score", scoreRoutes);
app.use("/api/studentReport", studentReport);
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/avg", avgRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
