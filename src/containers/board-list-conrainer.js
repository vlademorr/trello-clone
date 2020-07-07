import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchBoards } from "../actions/board-actions";
import BoardList from "../components/board-list";

const BoardListConrainer = ({
  boards,
  searchBarValue,
  fetchBoards,
  loading,
  error,
}) => {
  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const hanldeDragStart = (ev) => {
    const target = ev.target;
    ev.dataTransfer.setData("cardId", ev.target.getAttribute("data-card-id"));
    ev.dataTransfer.setData("boardId", ev.target.getAttribute("data-board-id"));
    setTimeout(() => {
      target.style.opacity = ".5";
    }, 0);
  };

  const onDragEnd = (e) => {
    e.target.style.opacity = "";
  };

  function dragOver(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="loading">Something wrong happen pls try again...</div>;

  return (
    <React.Fragment>
      <BoardList
        onDragStart={hanldeDragStart}
        onDragOver={dragOver}
        onDragEnd={onDragEnd}
        boards={boards}
        searchBarValue={searchBarValue}
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  boards: state.boardReducer.boards,
  loading: state.boardReducer.loading,
  searchBarValue: state.searchBarReducer.searchBarValue,
  error: state.searchBarReducer.error,
});

const mapDispatchToProps = {
  fetchBoards,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoardListConrainer);
