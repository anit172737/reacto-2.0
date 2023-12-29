const mongoose = require("mongoose");

async function connect() {
  try {
    mongoose.connect(
      "mongodb+srv://anitdhadve17:anit1727@cluster0.w3ggauk.mongodb.net/"
    );
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("mongoDB connected successfully");
    });

    connection.on("error", (err) => {
      console.log("error", err);
      process.exit();
    });
  } catch (error) {
    console.log("something went wrong", error);
  }
}

module.exports = connect;
