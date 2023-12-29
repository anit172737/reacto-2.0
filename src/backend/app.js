const connect = require("./dbConfig/dbConfig");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users/userRoutes");
const javascriptRoutes = require("./routes/interview/javascript/javascriptRoutes");
const reactRoutes = require("./routes/interview/reactjs/reactjsRoutes");
const app = express();
// const bcryptjs = require("bcryptjs");
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connect();

app.use("/api/user", userRoutes);
app.use("/api/javascript", javascriptRoutes);
app.use("/api/react", reactRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
