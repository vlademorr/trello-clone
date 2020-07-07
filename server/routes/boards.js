const express = require("express");
const router = express.Router();
const BoardModel = require("../models/board-model");
const CardModel = require("../models/card-model");

module.exports = () => {
  router.get("/", (req, res) => {
    BoardModel.find({})
      .populate("cards")
      .exec()
      .then((board) => res.status(200).json(board))
      .catch((err) => res.status(500).json(err));
  });

  router.patch("/update", (req, res) => {
    const { newBoardId, oldBoardId, cardId } = req.body;

    // delete the card id in current board
    const updateCurrentBoard = BoardModel.findByIdAndUpdate(oldBoardId, {
      $pull: { cards: cardId },
    }).exec();

    // add cardId to new board
    const updateNewBoard = BoardModel.findByIdAndUpdate(newBoardId, {
      $addToSet: { cards: cardId },
    }).exec();

    // and update the boardId in card

    const updateBoardIdInCard = CardModel.findByIdAndUpdate(cardId, {
      boardId: newBoardId,
    }).exec();

    Promise.all([updateCurrentBoard, updateNewBoard, updateBoardIdInCard])
      .then(() => res.sendStatus(200))
      .catch((err) => res.status(500).json(err));
  });
  return router;
};
