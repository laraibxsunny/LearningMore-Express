const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.get("/musicians", async (request, response) => {
  const allMusicians = await Musician.findAll();
  response.json(allMusicians);
});

app.get("/musicians/1", async (request, response) => {
  const firstMusician = await Musician.findByPk(1);
  response.json(firstMusician);
});

app.get("/musicians/2", async (request, response) => {
  const secondMusician = await Musician.findByPk(2);
  response.json(secondMusician);
});

app.get("/musicians/3", async (request, response) => {
  const thirdMusician = await Musician.findByPk(3);
  response.json(thirdMusician);
});

app.get("/bands", async (request, response) => {
  const allBands = await Band.findAll();
  response.json(allBands);
});

module.exports = app;
