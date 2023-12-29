const connect = require("../../../dbConfig/dbConfig");
const User = require("../../../models/userModel");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const app = express();
// const bcryptjs = require("bcryptjs");
const port = 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

connect();

app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    //check if user already exist
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ error: "User already exist" });
    }

    //hash password
    // const salt = await bcryptjs.genSalt(10);
    // const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = new User({
      email,
      // password: hashedPassword,
      password,
    });

    const savedUser = await newUser.save();

    console.log("savedUser", savedUser);
    return res.json({ message: "User successfully created!", status: 201 });
  } catch (error) {
    console.log("error", error.message);
    return res.json({ error: error.message, status: 500 });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //check user is exist or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ error: "User not exist", status: 400 });
    }

    //check password is valid or not

    if (password !== user.password) {
      return res.json({ error: "Invalid password", status: 400 });
    }

    const userData = {
      id: user._id,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(userData, "fullstack", {
      expiresIn: "1d",
    });

    const response = res.json({
      message: "Login successful",
      success: true,
      status: 201,
      token: token,
      userData: userData,
    });

    // response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
});

app.post("/api/googleLogin", async (req, res) => {
  const { email } = req.body;
  try {
    //check user is exist or not
    const user = await User.findOne({ email });
    if (!user) {
      // return res.json({ error: "User not exist", status: 400 });
      const newUser = new User({
        email,
        password: "123",
      });
      const userData = {
        email: email,
      };

      const token = await jwt.sign(userData, "fullstack", {
        expiresIn: "1d",
      });
      const savedUser = await newUser.save();

      console.log("savedUser", savedUser);
      return res.json({
        message: "User successfully created!",
        status: 201,
        token: token,
      });
    }

    const userData = {
      id: user._id,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(userData, "fullstack", {
      expiresIn: "1d",
    });

    const response = res.json({
      message: "Login successful",
      success: true,
      status: 201,
      token: token,
      userData: userData,
    });

    return response;
  } catch (error) {
    return res.json({ error: error.message, status: 500 });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
