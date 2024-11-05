const express = require("express");
const app = express();
const { Musician, Band } = require("../models/index");
const { db } = require("../db/connection");

const port = 3000;

app.use(express.json());

app.use(express.urlencoded());

app.get("/musicians", async (request, response) => {
  const allMusicians = await Musician.findAll();
  response.json(allMusicians);
});

app.get("/bands", async (request, response) => {
  const allBands = await Band.findAll();
  response.json(allBands);
});

app.get("/musicians/:id", async (req, res) => {
  const musicianById = await Musician.findByPk(req.params.id);
  res.json(musicianById);
});

app.post("/musicians", async (req, res) => {
  await Musician.create(req.body);
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

app.put("/musicians/:id", async (req, res) => {
  let updateMusician = await Musician.findByPk(req.params.id);
  await updateMusician.update(req.body);
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

app.delete("/musicians/:id", async (req, res) => {
  const deleteMusician = await Musician.findByPk(req.params.id);
  await deleteMusician.destroy();
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

module.exports = app;
