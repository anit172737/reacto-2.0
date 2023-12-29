const express = require("express");
const User = require("../../models/userModel");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
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
      isAdmin: email === "anit@gmail.com" ? true : false,
    });

    const savedUser = await newUser.save();

    console.log("savedUser", savedUser);
    return res.json({ message: "User successfully created!", status: 201 });
  } catch (error) {
    console.log("error", error.message);
    return res.json({ error: error.message, status: 500 });
  }
});

router.post("/login", async (req, res) => {
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
      isAdmin: user.isAdmin,
    };

    //create token
    const token = await jwt.sign(userData, "fullstack", {
      expiresIn: "1m",
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

router.post("/googleLogin", async (req, res) => {
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
        expiresIn: "1h",
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
      isAdmin: false,
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

module.exports = router;
