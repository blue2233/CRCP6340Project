# Integrating project.ejs and projects.ejs into the App

## What index-compare.ejs does that your index.ejs doesn't

In `index-compare.ejs`, the Featured section has two buttons at the bottom of the
project info column (lines 60–65) that your current `index.ejs` is missing:

```html
<a href="/project/1">
  <button type="button" class="m-2 btn btn-outline-light">Go to this project</button>
</a>

<a href="/projects">
  <button type="button" class="m-2 btn btn-outline-light">See all projects</button>
</a>
```

These are the only two lines in `index-compare.ejs` that connect to the other pages:
- `/project/1` → loads `project.ejs` and shows the detail page for a single project
- `/projects` → loads `projects.ejs` and shows a list of all projects

---

## Step 1 — Add the buttons to index.ejs

In your `index.ejs`, find the Featured section's right column (the NFT metadata fields).
After the last metadata item (Opens: June 2026), add the two buttons:

```html
<div class="d-flex flex-column gap-2 mt-3">
  <a href="/project/1" class="btn btn-outline-light">Go to this project</a>
  <a href="/projects" class="btn btn-outline-light">See all projects</a>
</div>
```

Place this inside the `<div class="d-flex flex-column gap-3">` block, after the
"Opens" entry around line 95.

---

## Step 2 — Add the routes to app.js

Right now `app.js` has no routes for `/projects` or `/project/:id`. You need to
add two new GET routes. The templates expect data passed in from the server.

### /projects route

`projects.ejs` loops over a variable called `projectArray` — a list of project names
pulled from your database. The route needs to query the DB and pass that array in:

```js
app.get("/projects", async (req, res) => {
  // TODO: replace with real DB query
  const projectArray = ["Arc Toroid", "Project 2", "Project 3"];
  res.render("projects.ejs", { projectArray });
});
```

### /project/:id route

`project.ejs` displays a single project using a variable called `which`. The `:id`
in the URL is the project's ID from the database:

```js
app.get("/project/:id", (req, res) => {
  const which = req.params.id;
  // TODO: replace with real DB query using `which` as the lookup key
  res.render("project.ejs", { which });
});
```

---

## Step 3 — What project.ejs and projects.ejs currently show

These templates are stubs right now — they just display the raw data passed in.
Here is what they render today:

| Template | What it shows |
|---|---|
| `projects.ejs` | A plain list of project names, each linked to `/project/1`, `/project/2`, etc. |
| `project.ejs` | The text "Project Page for [id]" using the `which` variable |

They are placeholders waiting for you to style them to match your site and wire them
up to real database queries.

---

## Step 4 — The bigger picture (database connection)

To make these pages actually pull live data, you will eventually need to:

1. Connect to MySQL in `app.js` using a package like `mysql2`
2. In the `/projects` route, query `SELECT id, project_name FROM projects`
   and pass the results as `projectArray`
3. In the `/project/:id` route, query `SELECT * FROM projects WHERE id = ?`
   using `req.params.id` and pass the full row to `project.ejs`

That is a separate task from wiring up the buttons and routes, but this is the
order of operations when you get there.

---

## Summary of files to touch

| File | What to change |
|---|---|
| `views/index.ejs` | Add the two buttons to the Featured section |
| `app.js` | Add `/projects` and `/project/:id` GET routes |
| `views/projects.ejs` | Style and expand once routes are working |
| `views/project.ejs` | Style and expand once routes are working |
