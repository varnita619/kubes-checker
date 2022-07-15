const express = require("express");
const app = express();
const cors = require("cors");
const axios = require('axios');

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Route Imports

const allRepos = require("./routes/repos");

app.use("/api/v1", allRepos);
const head = {
  "Content-type": "application/json",
  // Authorization: "token ac19fd59-038d-47c6-8702-cd717bfca4a5"
  Authorization: 'token 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'
};

app.get("/fetchrepos", async (req, res) => {
  const result = await axios.get("https://snyk.io/api/v1/org/26a3b7a1-9725-41a6-8eb2-722b5058024e/projects", { 
    headers: {
      head, 
    }, 
  });
  console.log(result);
});

module.exports = app;
