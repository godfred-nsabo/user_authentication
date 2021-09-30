"use strict";

const express = require("express");
const app = express();
const bcyrpt = require("bcrypt");

app.use(express.json());

const users = [];

app.get("/users", (req, res) => {
  res.json(users);
});

app.post("/users", async (req, res) => {
  try {
    // let salt = await bcyrpt.genSalt();
    let hashPassword = await bcyrpt.hash(req.body.password, 10);
    //console.log(salt);
    console.log(hashPassword);
    let user = { name: req.body.name, password: hashPassword };
    users.push(user);
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
    console.log(error);
  }
});

app.post("/users/login", async (req, res) => {
  const user = users.find((user) => (user.name = req.body.name));
  if (user === null) {
    return res.status(400).send("Cannot find user");
  }
  try {
    if (await bcyrpt.compare(req.body.password, user.password)) {
      res.send("Success");
    } else {
      res.send("Not Allowed");
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(2000);
