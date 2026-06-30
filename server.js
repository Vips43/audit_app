import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import { errorHandler, notFound } from "./middleware/notFound.js";
import questionRoutes from './routes/questionRoutes.js'

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionRoutes); 

app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    environment: process.env.NODE_ENV || "development",
  });
});

//error handlers notfound
app.use(notFound);
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("mongo connected to audit"))
  .catch((err) => console.error("Connection aborted: ", err));

app.listen(5000, () => {
  console.log("server started on 5000");
});
