const express = require("express");
const router = express.Router();
const CardModel = require("../models/card-model");
const BoardModel = require("../models/board-model");

module.exports = () => {
  router.post("/", (req, res) => {
    const { card } = req.body;
    const { header, tags, description, boardId } = card;

    const newCard = new CardModel({
      header,
      tags,
      description,
      boardId,
    });

    (async function () {
      try {
        const createdCard = await newCard.save();
        await BoardModel.findByIdAndUpdate(boardId, {
          $addToSet: { cards: createdCard._id },
        }).exec();
        res.status(201).json(createdCard);
      } catch (error) {
        res.status(500).json(error);
      }
    })();
  });

  router.patch("/update", (req, res) => {
    const { card } = req.body;
    const { header, tags, description, cardId } = card;
    console.log(card);
    CardModel.findByIdAndUpdate(
      cardId,
      {
        tags,
        header,
        description,
      },
      { new: true }
    )
      .exec()
      .then((updatedCard) => res.status(200).json(updatedCard))
      .catch((err) => res.status(500).json(err));
  });
  return router;
};
