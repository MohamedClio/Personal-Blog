import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import multer from "multer";

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/assets/images");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const upload = multer({ storage: storage });

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
app.post("/submit", upload.single("blog_image"), (req, res) => {
  const blogTitle = req.body["blog_title"];
  const blogType = req.body["blog_type"];
  const blogBody = req.body["blog_body"];
  req.files[0].originalname = Buffer.from(
    req.files[0].originalname,
    "latin1"
  ).toString("utf-8");
  console.log(req.file, req.body);
  res.render("home.ejs", {
    ttl: blogTitle,
    typ: blogType,
    bdy: blogBody,
  });
});
