import express from "express";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();

const app = express()
const port = 3000
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static('public'));

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.get("/contact", (req, res) => {
  res.render("contact.ejs");
});

app.get("/index", (req, res) => {
  res.render("index.ejs");
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});


// ##### /projects route - list of all projects (placeholder) #####
app.get("/projects", async (req, res) => {
  // TODO: replace with real DB query
  const projectArray = ["Project 1", "Project 2", "Project 3"];
  res.render("projects.ejs", { projectArray });
});

// ##### /project/:id route - details for a specific project (placeholder) #####
app.get("/project/:id", (req, res) => {
  const which = req.params.id;
  // TODO: replace with real DB query using `which` as the lookup key
  res.render("project.ejs", { which });
});