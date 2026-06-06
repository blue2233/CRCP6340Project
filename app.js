import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from "./utils/database.js";

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

app.get("/", async (req, res, next) => {
  try {
    const projects = await db.getAllProjects();
    console.log(projects);
    const featuredRand = Math.floor(Math.random() * projects.length);
    res.render("index.ejs", { featuredProject: projects[featuredRand] });
  } catch (err) {
    next(err);
  }
});

app.get("/projects", async (req, res, next) => {
  try {
    const projectArray = await db.getAllProjects();
    res.render("projects.ejs", { projectArray });
  } catch (err) {
    next(err);
  }
});

app.get("/project/:id", async (req, res, next) => {
  try {
    const which = req.params.id;
    const project = await db.getProjectById(which);
    if (!project) throw new Error("No project with that ID");
    res.render("project.ejs", { project, which });
  } catch (err) {
    next(err);
  }
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.post("/mail", async (req, res) => {
  await utils
    .sendMessage(req.body.sub, req.body.txt)
    .then(() => {
      res.send({ result: "success" });
    })
    .catch(() => {
      res.send({ result: "failure" });
    });
});

app.use((err, req, res, next) => {
  console.log(err);
  let msg = err.message;
  if (msg !== "No project with that ID") {
    msg = "There was an internal error. Apologies. We are working on cleaning up the mess.";
  }
  res.render("error.ejs", { msg });
});

db.connect().then(() => {
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
});
