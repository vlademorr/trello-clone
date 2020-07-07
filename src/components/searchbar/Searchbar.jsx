import React from "react";
import { handleChangeAction } from "../../actions/search-bar-actions";
import { connect } from "react-redux";

import "./searchbar.css";

const SearchBar = ({ handleChangeAction }) => {
  return (
    <div id="menu">
      <div className="menu-search-input-wrapp">
        <input
          onChange={handleChangeAction}
          className="text-input"
          placeholder="search cards"
          type="text"
        />
      </div>
    </div>
  );
};
const mapDispatchToProps = {
  handleChangeAction,
};

export default connect(null, mapDispatchToProps)(SearchBar);
