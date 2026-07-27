import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as utils from "./utils/utils.js";
dotenv.config();
import * as db from "./utils/database.js";

// Initialize the data arrays
let projects = [];
let contracts = [];
let mints = [];

const app = express();
app.use(cors());
const port = 8080;
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.static("public"));

// Loads the project records from the database into the shared
// projects/contracts/mints arrays. Called once at startup so every route
// has data available immediately after a restart, and again on each "/"
// hit to keep it fresh.
async function loadProjects() {
  await db.connect();
  projects = await db.getAllProjects();
  contracts = [];
  mints = [];
  projects.forEach((item) => {
    contracts.push(item.contractAddress);
    mints.push(0); // init parallel array
  });
}

app.get("/", async (req, res, next) => {
  await loadProjects()
    .then(() => {
      let featuredRand = Math.floor(Math.random() * projects.length);
      res.render("index.ejs", {
        featuredProject: projects[featuredRand],
        featuredIndex: featuredRand, // position in contracts/mints/projects arrays, for client-side mint-count lookup
        contracts: contracts,
        mints: mints,
        projects: projects,
      });
    })
    .catch(next);
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs", {
    contracts: contracts,
    mints: mints,
    projects: projects,
      });
});

app.get("/project/:id", (req, res) => {
  let id = req.params.id;
  if (id > projects.length) {
    throw new Error("No project with that ID");
  }
  res.render("project.ejs", { 
    project: projects[id - 1], 
    contracts: contracts,
    mints: mints,
    projects: projects,
      });
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

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!");
});

app.use((err, req, res, next) => {
  console.log(err);
  let msg = err.message;
  if (msg !== "No project with that ID") {
    msg = "There was an internal error. Apologies. We are working on cleaning up the mess.";
  }
  res.render("error.ejs", { msg });
});

loadProjects()
  .catch((err) => {
    console.error("Failed to load initial project data:", err);
  })
  .finally(() => {
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  });

