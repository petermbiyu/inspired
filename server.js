import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
const app = express();
const port = process.env.PORT || 3000;

// == middleware ==
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

// register view engine
app.set("view engine", "ejs");

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello word");
});
