import dotenv from "dotenv";
dotenv.config();
import express from "express";
import DiariesRoute from "./routes/diariesRoutes.js";
import AuthRoutes from "./routes/authRoutes.js";
import UserProfileRoutes from "./routes/userProfileRoutes.js";
import cookieParser from "cookie-parser";
import verifyJwt from "./middleware/verifyJwt.js";
import cors from "cors";
import { corsOptions } from "./config/cors.js";
import { credentials } from "./middleware/credentials.js";

function fakeUser(req, res, next) {
  req.user = { username: "thatchin" };
  next();
}

const app = express();

//middleware
app.use(credentials);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
// app.use(fakeUser);

//public routes
app.use("/api/v1/auth/", AuthRoutes);

//protected routes
app.use("/api/v1/", verifyJwt, DiariesRoute);
app.use("/api/v1/userprofile", verifyJwt, UserProfileRoutes);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`server up and running in port ${process.env.SERVER_PORT}`);
});
