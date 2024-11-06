const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const { db } = require("../db/connection");
const musicicanRouter = require("./routes/musicians");
const bandRouter = require("./routes/bands");

const port = 3000;

app.use(express.json());

app.use(express.urlencoded());

app.use("/musicians", musicicanRouter);

app.use("/bands", bandRouter);

module.exports = app;
