import React from "react";
import Board from "../board";

const BoardList = ({
  boards,
  searchBarValue,
  onDragEnd,
  onDragStart,
  onDragOver,
}) => {
  const data = boards?.entities?.node;
  return (
    <div className="container">
      {(boards.result || []).map((item) => {
        const board = data[item];
        const { _id, backgroundColor, boardStatus, cards } = board;
        const filteredCards =
          searchBarValue.length >= 2
            ? cards.filter((card) => {
                const includeHeader = card.header
                  .toLowerCase()
                  .includes(searchBarValue);
                const includeDescription = card.description
                  .toLowerCase()
                  .includes(searchBarValue);
                const includeTags = card.tags.some((tag) =>
                  tag.name.toLowerCase().includes(searchBarValue) && tag.checked
                );
                return includeTags || includeDescription || includeHeader;
              })
            : cards;
        return (
          <Board
            onDragEnd={onDragEnd}
            key={_id}
            boardId={_id}
            backgroundColor={backgroundColor}
            boardStatus={boardStatus}
            onDragOver={onDragOver}
            onDragStart={onDragStart}
            cards={filteredCards}
          />
        );
      })}
    </div>
  );
};

export default BoardList;
