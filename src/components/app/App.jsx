import React from "react";
import BoardListConrainer from "../../containers/board-list-conrainer";
import SearchBar from "../searchbar/Searchbar";
import Modal from "../modal/Modal";

import "./app.css";

const App = () => {
  return (
    <React.Fragment>
      <Modal />
      <SearchBar />
      <BoardListConrainer />
    </React.Fragment>
  );
};

export default App;
