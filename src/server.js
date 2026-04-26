import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { DBConnect } from "./config/DBConnect.js";
import { authRouter } from "./routes/authRoutes.js";
import { contactRoute } from "./routes/contactRoutes.js";
import { postRoute } from "./routes/postRoutes.js";
import { topicRoutes } from "./routes/topicsRoutes.js";
import { classRoutes } from "./routes/classRoutes.js";
import { assessmentRoute } from "./routes/assessmentRoutes.js";
import { adminRoutes } from "./routes/adminRoutes.js";
import { ejsRoutes } from "./routes/ejsPublicRoutes.js";
import { academicRoutes } from "./routes/academicRoutes.js";
import { submissionRoutes } from "./routes/submissionRoutes.js";
import { questRoutes } from "./routes/questionRoutes.js";

const app = express();
const port = process.env.PORT || 3000;
DBConnect();
// es_directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// == middleware ==
app.use(cors({ credentials: true, origin: `http://localhost:${port}` }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// register view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
// api endpoint
app.use("/api/auth", authRouter);
app.use("/api/classes", classRoutes);
app.use("/api/message", contactRoute);
app.use("/api/admin", postRoute);
app.use("/api/admin", topicRoutes);
app.use("/api/assessment", assessmentRoute);
app.use("/api/submission", submissionRoutes);
app.use("/api/question", questRoutes);

// frontend End point
app.use(ejsRoutes);
app.use(academicRoutes);
app.use("/admin", adminRoutes);

// error handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(400).json({ success: false, message: err.message });
});

// post upload
// use slug
app.get("/:slug", (req, res) => {
  res.render("article");
});

app.get((req, res) => {
  res.send("Oops! an error occurred");
});
