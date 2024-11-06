const express = require("express");
const bandRouter = express.Router();
const Band = require("../../models/Band.js");
const Musician = require("../../models/Musician.js");

bandRouter.get("/", async (req, res) => {
  const allBands = await Band.findAll({ include: Musician });
  res.json(allBands);
});

bandRouter.get("/:id", async (req, res) => {
  const bandByID = await Band.findByPk(req.params.id, { include: Musician });
  res.json(bandByID);
});

module.exports = bandRouter;
