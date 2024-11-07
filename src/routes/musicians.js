const express = require("express");
const musicicanRouter = express.Router();
const Musician = require("../../models/Musician.js");
const { check, validationResult } = require("express-validator");

musicicanRouter.get("/", async (req, res) => {
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

musicicanRouter.get("/:id", async (req, res) => {
  const musicianByID = await Musician.findByPk(req.params.id);
  res.json(musicianByID);
});

musicicanRouter.post(
  "/",
  [check("name").not().isEmpty().trim()],
  [check("instrument").not().isEmpty().trim()],
  [check("name").isLength({ min: 2, max: 20 })],
  [check("instrument").isLength({ min: 2, max: 20 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ error: errors.array() });
    } else {
      await Musician.create(req.body);
      const allMusicians = await Musician.findAll();
      res.json(allMusicians);
    }
  }
);

musicicanRouter.put(
  "/:id",
  [check("name").not().isEmpty().trim()],
  [check("instrument").not().isEmpty().trim()],
  [check("name").isLength({ min: 2, max: 20 })],
  [check("instrument").isLength({ min: 2, max: 20 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      res.json({ error: errors.array() });
    } else {
      let updateMusician = await Musician.findByPk(req.params.id);
      await updateMusician.update(req.body);
      const allMusicians = await Musician.findAll();
      res.json(allMusicians);
    }
  }
);

musicicanRouter.delete("/:id", async (req, res) => {
  const deleteMusician = await Musician.findByPk(req.params.id);
  await deleteMusician.destroy();
  const allMusicians = await Musician.findAll();
  res.json(allMusicians);
});

module.exports = musicicanRouter;
