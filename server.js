import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dbConnect } from "./config/DBConnect.js";
import { authRouter } from "./routes/authRoutes.js";
import { contactRoute } from "./routes/contactRoutes.js";
import { postRoute } from "./routes/postRoutes.js";
import { topicRoutes } from "./routes/topicsRoutes.js";

const app = express();
const port = process.env.PORT || 3000;
dbConnect();
// es_directory
const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);

// == middleware ==
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(_dirname, "public")));

// register view engine
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
// api endpoint
app.use("/api/auth", authRouter);
app.use("/api/message", contactRoute);
app.use("/api/admin", postRoute);
app.use("/api/admin", topicRoutes);

// ejs endpoint
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/services", (req, res) => {
  res.render("services");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/blogs", (req, res) => {
  res.render("blogs");
});
app.get("/article", (req, res) => {
  res.render("article");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/reset", (req, res) => {
  res.render("reset");
});
app.get("/passreset", (req, res) => {
  res.render("passreset");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/logic", (req, res) => {
  res.render("logic");
});
app.get("/learning", (req, res) => {
  res.render("learningArea");
});
app.get("/resources", (req, res) => {
  res.render("resources");
});
app.get("/terms", (req, res) => {
  res.render("terms");
});

// admin pages
app.get("/admin", (req, res) => {
  res.render("admin/admin");
});
//  admin posts
app.get("/admin/posts", (req, res) => {
  res.render("admin/post/posts");
});
app.get("/admin/add-post", (req, res) => {
  res.render("admin/post/add");
});
app.get("/admin/edit", (req, res) => {
  res.render("admin/post/edit");
});
// admin topics
app.get("/admin/topics", (req, res) => {
  res.render("admin/topics/topics");
});
app.get("/admin/add-topic", (req, res) => {
  res.render("admin/topics/add");
});
// post upload

app.get((req, res) => {
  res.send("Oops! an error occurred");
});
