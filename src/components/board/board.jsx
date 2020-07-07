import React from "react";
import { connect } from "react-redux";
import { onCardDropped } from "../../actions/board-actions";

import Card from "../card";
import AddCard from "../add-card/AddCard";
import "./board.css";

const Board = (props) => {
  const {
    backgroundColor,
    onDragOver,
    boardStatus,
    cards,
    onDragStart,
    onCardDropped,
    boardId,
    onDragEnd,
  } = props;

  const handleDrop = (e) => {
    const cardId = e.dataTransfer.getData("cardId");
    const oldBoardId = e.dataTransfer.getData("boardId");
    if (oldBoardId === boardId) return;
    onCardDropped(oldBoardId, boardId, cardId);
  };
  return (
    <div className="drag-container-wrapp">
      <div
        style={{ background: backgroundColor }}
        className="drag-container-header"
      >
        <div>
          <p>{boardStatus}</p>
        </div>
        <div>{cards.length}</div>
      </div>
      <div
        onDrop={handleDrop}
        style={{ background: backgroundColor }}
        className="drag-container"
        onDragOver={onDragOver}
        key={boardStatus}
      >
        {cards.map((card) => {
          return (
            <Card
              onDragEnd={onDragEnd}
              card={card}
              key={card._id}
              boardId={boardId}
              onDragStart={onDragStart}
            />
          );
        })}
        <AddCard boardId={boardId} />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  onCardDropped,
};

export default connect(null, mapDispatchToProps)(Board);
