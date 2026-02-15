import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const port = process.env.PORT || 3000;

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

app.get("/", (req, res) => {
  res.render("index");
});
app.get((req, res) => {
  res.send("Oops! an error occurred");
});
