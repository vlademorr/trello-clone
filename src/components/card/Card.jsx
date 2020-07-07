import React from "react";
import UpdateCardButton from "../update-card/UpdateCard";
import "./card.css";
import CardTags from "../card-tags/CardTags";

const Card = (props) => {
  const { onDragStart, boardId, card, onDragEnd } = props;
  const { header, tags, description, _id } = card;
  return (
    <div
      key={_id}
      onDragEnd={onDragEnd}
      data-card-id={_id}
      data-board-id={boardId}
      draggable
      onDragStart={(e) => onDragStart(e, boardId)}
      className="card"
    >
      <div className="card-header-wrapp">
        <p className="card-header">{header}</p>
        <UpdateCardButton card={card} />
      </div>
      <div className="card-description">
        <p>{description}</p>
      </div>
      <CardTags tags={tags.filter((tag) => tag.checked)} />
    </div>
  );
};

export default Card;
