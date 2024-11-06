const express = require("express");
const musicicanRouter = express.Router();
const Musician = require("../../models/Musician.js");

musicicanRouter.get("/", async (req, res) => {
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

musicicanRouter.get("/:id", async (req, res) => {
  const musicianByID = await Musician.findByPk(req.params.id);
  res.json(musicianByID);
});

musicicanRouter.post("/", async (req, res) => {
  await Musician.create(req.body);
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

musicicanRouter.put("/:id", async (req, res) => {
  let updateMusician = await Musician.findByPk(req.params.id);
  await updateMusician.update(req.body);
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

musicicanRouter.delete("/:id", async (req, res) => {
  const deleteMusician = await Musician.findByPk(req.params.id);
  await deleteMusician.destroy();
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

module.exports = musicicanRouter;
