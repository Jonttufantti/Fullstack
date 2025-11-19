import express from "express";
const app = express();
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import requestLogger from "./middleware/requestLogger.js";
import errorHandler from "./middleware/errorHandler.js";
import unknownEndpoint from "./middleware/unknownEndpoint.js";
import authRoute from "./modules/auth/auth.routes.js";
import meRoute from "./modules/me/me.routes.js";
import usersRoute from "./modules/users/users.routes.js";
import computersRoute from "./modules/computers/computers.routes.js";

dotenv.config();

// MongoDB
// =============================================================================

// Edit the connection string in the .env file. Its either 127.0.0.1 or 0.0.0.0.
// Connects the API to MongoDB.
const connect = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test";

    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB:", mongoUri);
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
};

connect();


// Listeners for troubleshooting. Checks for connection problems and tries again
mongoose.connection.on("disconnected", () => {
  console.log("mongodb disconnected");
});

// Express
// =============================================================================

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(requestLogger);

app.use("/api/auth", authRoute);
app.use("/api/me", meRoute);
app.use("/api/users", usersRoute);
app.use("/api/computers", computersRoute);

app.use(unknownEndpoint);
app.use(errorHandler);

export default app;
