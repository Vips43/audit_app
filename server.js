import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { errorHandler, notFound } from "./middleware/notFound.js";
import morgan from "morgan";
import bodyParser from "body-parser";
import questionRoutes from "./routes/questionRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import { authenticateUser } from "./middleware/authMiddleware.js";
import User from "./model/userModal.js";

dotenv.config();
const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());

app.use("/api/questions", questionRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    environment: process.env.NODE_ENV || "development",
  });
});

//error handlers notfound
app.use(notFound);
app.use(errorHandler);

const mongourl =
  process.env.NODE_ENV === "development"
    ? process.env.MONGO_LOCAL
    : process.env.MONGO_URI;

mongoose
  .connect(mongourl)
  .then((conn) =>
    console.log(
      "mongo connected to ",
      conn.connection.host,
      "->",
      conn.connection.name,
    ),
  )
  .catch((err) => console.error("Connection aborted: ", err));

app.listen(5000, () => {
  console.log("server started on 5000");
});
