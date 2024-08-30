require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const connect = require("./dbConfig/dbConfig");
const userRoutes = require("./routes/users/userRoutes");
const javascriptRoutes = require("./routes/interview/javascript/javascriptRoutes");
const reactRoutes = require("./routes/interview/reactjs/reactjsRoutes");
const nextRoutes = require("./routes/interview/nextjs/nextjsRoutes");
const typescriptRoutes = require("./routes/interview/typescript/typescriptRoutes");
const upload = require("./middleware/uploader");
const app = express();
const port = 8000;

// Enable CORS for all routes
const allowedOrigins = [
  "http://localhost:3000", // Local development
  "https://reacto2.vercel.app", // Your Vercel app URL
  "https://newreacto.serveo.net", // Your Localtunnel URL
];

// CORS configuration
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// app.options("*", cors());

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/uploads", express.static("../uploads"));

// Connect to the database
connect();

// Define routes
app.use("/api/user", userRoutes);
app.use("/api/javascript", javascriptRoutes);
app.use("/api/react", reactRoutes);
app.use("/api/next", nextRoutes);
app.use("/api/type", typescriptRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
