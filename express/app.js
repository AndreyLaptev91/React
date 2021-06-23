const express = require("express");
const fs = require("fs");

const app = express();
const jsonParser = express.json();
const filePath = "product.json";
const PORT = process.env.PORT ?? 3000;

app.get("/api/goods", (req, res) => {
  const content = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(content);
  res.send(users);
});

app.get("/api/goods/:id", (req, res) => {
  const id = req.params.id;
  const content = fs.readFileSync(filePath, "utf8");
  const users = JSON.parse(content);
  let user = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      user = users[i];
      break;
    }
  }
  if (user) {
    res.send(user);
  } else {
    res.status(404).send();
  }
});

app.post("/api/goods", jsonParser, (req, res) => {
  if (!req.body) return res.sendStatus(400);

  const prolike = req.body.like;
  const proLabel = req.body.label;
  const proImportant = req.body.important;

  let autograph = {
    like: prolike,
    label: proLabel,
    important: proImportant,
  };

  let data = fs.readFileSync(filePath, "utf8");
  let autographs = JSON.parse(data);

  const id = Math.max.apply(
    Math,
    autographs.map(function (o) {
      return o.id;
    })
  );

  autograph.id = id + 1;
  autographs.push(autograph);
  data = JSON.stringify(autographs);
  fs.writeFileSync("autograph.json", data);
  res.send(autograph);
});

app.delete("/api/goods/:id", (req, res) => {
  const id = req.params.id;
  let data = fs.readFileSync(filePath, "utf8");
  let autographs = JSON.parse(data);
  let index = -1;

  for (let i = 0; i < autographs.length; i++) {
    if (autographs[i].id === id) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    const autograph = autographs.splice(index, 1)[0];
    data = JSON.stringify(autographs);
    fs.writeFileSync("autograph.json", data);
    res.send(autograph);
  } else {
    res.status(404).send();
  }
});

app.put("/api/goods", jsonParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);

  const prorId = req.body.id;
  const prolike = req.body.like;
  const proLabel = req.body.label;
  const proImportant = req.body.important;

  let data = fs.readFileSync(filePath, "utf8");
  const autographs = JSON.parse(data);
  let autograph;
  for (let i = 0; i < autographs.length; i++) {
    if (autographs[i].id === prorId) {
      autograph = autographs[i];
      break;
    }
  }

  if (autograph) {
    autograph.like = prolike;
    autograph.label = proLabel;
    autograph.important = proImportant;

    data = JSON.stringify(autographs);
    fs.writeFileSync("autograph.json", data);
    res.send(autograph);
  } else {
    res.status(404).send(autograph);
  }
});

app.listen(PORT);
