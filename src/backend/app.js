const connect = require("./dbConfig/dbConfig");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/users/userRoutes");
const javascriptRoutes = require("./routes/interview/javascript/javascriptRoutes");
const reactRoutes = require("./routes/interview/reactjs/reactjsRoutes");
const nextRoutes = require("./routes/interview/nextjs/nextjsRoutes");
const typescriptRoutes = require("./routes/interview/typescript/typescriptRoutes");
const upload = require("./middleware/uploader");
const app = express();
// const bcryptjs = require("bcryptjs");
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("../uploads"));

connect();

app.use("/api/user", userRoutes);
app.use("/api/javascript", javascriptRoutes);
app.use("/api/react", reactRoutes);
app.use("/api/next", nextRoutes);
app.use("/api/type", typescriptRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
