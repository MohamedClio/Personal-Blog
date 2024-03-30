import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.render("home.ejs");
});
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get("/create", (req, res) => {
  res.render("create.ejs");
});
app.get("/edit", (req, res) => {
  res.render("edit.ejs");
});
app.get("/about", (req, res) => {
  res.render("about.ejs");
});
app.get("/blog1", (req, res) => {
  res.render("blog1.ejs");
});
