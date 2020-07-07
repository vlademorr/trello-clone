import React from "react";
import { connect } from "react-redux";
import { toggleModal } from "../../actions/board-actions";

import plusSvg from "./plusScale.svg";
import "./add-card.css";

const AddCard = ({ toggleModal, boardId }) => {
  return (
    <div className="add-card-wrapp">
      <div className="add-card-button-wrapp">
        <button
          onClick={() => toggleModal(true, false, { boardId })}
          className="add-card-button"
        >
          <img src={plusSvg} alt="add-card-icon" />
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  toggleModal,
};

export default connect(null, mapDispatchToProps)(AddCard);
