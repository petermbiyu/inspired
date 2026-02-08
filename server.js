import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;

// == middleware ==
app.use(cors());

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello word");
});
