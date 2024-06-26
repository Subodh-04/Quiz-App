require("dotenv").config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const cors = require("cors");

app.use(
  cors({
    origin: "https://quizkarooo.onrender.com",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: "true",
  })
);

app.use(express.json());

app.use("/api/auth", router);
app.use(errorMiddleware);

const PORT = 5000;

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server running at port ${PORT}`);
  });
});
