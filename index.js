import express from "express";
import productsRoutes from "./routes/products.js";
import authRoutes from "./routes/auth.js";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { authenticate } from "./middlewares/auth.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/products", authenticate, productsRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the Home Page");
});

mongoose
  .connect(process.env.CONNECTION_URL_DEV)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
