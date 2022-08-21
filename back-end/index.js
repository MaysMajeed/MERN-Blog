const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const userRouter = require("./routes/userRoute");
const postRouter = require("./routes/postRoute");
const cors = require("cors");

dotenv.config();
app.use(express.json());
app.use(cors());
mongoose
  .connect(process.env.mongoURL, { dbName: "blogWebsite" })
  .then(console.log("connected to MongoDB"))
  .catch((err) => {
    console.log(err);
  });

app.use("/v1/users", userRouter);
app.use("/v1/posts", postRouter);

app.listen("5002", () => {
  console.log("Listening to port 5002");
});
