import React from "react";
import { connect } from "react-redux";
import { toggleModal } from "../../actions/board-actions";

import settingsSVG from "./gear.svg";
import "./update-card.css";

const UpdateCardButton = ({ toggleModal, card }) => {
  const handleClick = () => {
    toggleModal(true, true, card);
  };
  return (
    <div className="update-card-button-wrapp">
      <button onClick={handleClick} className="update-card-button">
        <img src={settingsSVG} alt="update" />
      </button>
    </div>
  );
};

const mapDispatchToProps = {
  toggleModal,
};
export default connect(null, mapDispatchToProps)(UpdateCardButton);
