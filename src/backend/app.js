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
// Define allowed origins
const allowedOrigins = [
  "http://localhost:8000", // Local development
  "https://reacto2.vercel.app/", // Your Vercel app URL
  "https://abcd1234.loca.lt", // Replace with your Localtunnel URL
];

// Configure CORS middleware
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);

      // Check if the origin is in the allowedOrigins array
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

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
