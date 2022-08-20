const express = require("express");
const path = require("path");
const app = express();
const port = 5000;
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const user = require("./models/user");
const timetable = require("./models/timtable");
const todos = require("./models/todos");

const ejs = require("ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");

mongoose.connect("mongodb://localhost:27017/delta-hackathon");

app.get("/signup", (req, res) => {
  res.render("signup.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  const name = req.body.username;
  const password = req.body.psw;

  const currentuser = await user.findOne({ username: name });

  if (currentuser === null) {
    console.log("invalid username");
    res.redirect("/login");
  } else {
    console.log(password);
    console.log(currentuser.password);
    if (await bcrypt.compare(password, currentuser.password)) {
      const objectid = currentuser.id;
      console.log("success");

      res.render("mainpage.ejs", { objectid });
    } else {
      res.send("wrong pasword");
    }
  }
});
app.post("/signup", async (req, res) => {
  try {
    const hashedpassword = await bcrypt.hash(req.body.psw, 10);
    const name = req.body.username;

    console.log(hashedpassword);
    console.log(name);

    const response = await user.create({
      username: name,
      password: hashedpassword,
    });

    console.log("user created successfully", response);
    res.redirect("/login");
  } catch (error) {
    if (error.code === 11000) {
      console.log("username alredy in use");
    }
    console.log(error);
    res.redirect("/signup");
    console.log("failed");
  }
});

app.post("/shellcmd/timetable", async (req, res) => {
  console.log("got shellcmd");
  await console.log(req.body);

  const response = await timetable.create({
    lecture: req.body.lec,
    lecturetime: req.body.lectime,
  });
});

app.post("/shellcmd/todos", async (req, res) => {
  console.log("got shellcmd");
  await console.log(req.body);

  const response = await todos.create({
    todo: req.body.todo,
  });
});

app.listen(port);
