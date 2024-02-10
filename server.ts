import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import BookRoutes from "./routes/bookRoutes";
require("dotenv").config();

const app = express();
const port = process.env.PORT || 6500;
const dbName = process.env.MONGO_DB_LOCAL as string;
console.log("dbName", dbName);
mongoose
  .connect(dbName, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  } as mongoose.ConnectOptions) // Type assertion
  .then(() => {
    console.log("DB CONNECTED");
  });
app.use(express.json());
app.use("/api/v1", userRoutes);
app.use("/api/v1", BookRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    msg: "Welcome to the Server",
  });
});

// listen to port
app.listen(Number(port), () => {
  console.log(`Express Server is Started at PORT : ${port}`);
});
