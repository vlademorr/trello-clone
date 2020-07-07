/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import ReactModal from "react-modal";
import closeIcon from "./close.svg";

import "./modal.css";
import {
  toggleModal,
  addNewCardAction,
  updateExistsCard,
} from "../../actions/board-actions";
import { connect } from "react-redux";

ReactModal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    width: "30%",
    height: "max-content",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function defaultTags() {
  return [
    { name: "research", checked: false },
    { name: "marketing", checked: false },
    { name: "design", checked: false },
  ];
}

const Modal = (props) => {
  const {
    isOpen,
    toggleModal,
    isUpdateModal,
    card,
    addNewCardAction,
    updateExistsCard,
    cardLoading,
  } = props;
  const [header, setHeader] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState(defaultTags());

  useEffect(() => {
    if (isUpdateModal) {
      setHeader(card.header);
      setDescription(card.description);
      const updatedTags = tags.map((item) => {
        const tag = card.tags.find((el) => el.name === item.name);
        return Object.assign(item, tag);
      });
      setTags(updatedTags);
    }
  }, [isUpdateModal]);

  function hanldeChecked(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    const updateTags = tags.map((tag) => {
      if (tag.name === item) {
        tag.checked = isChecked;
      }
      return tag;
    });
    setTags(updateTags);
  }

  function hanldeClose() {
    toggleModal(false);
    setTags(defaultTags());
    setHeader("");
    setDescription("");
  }

  function hanldeAddNewCard(e) {
    e.preventDefault();
    if (isUpdateModal) {
      return updateExistsCard({
        header,
        tags,
        description,
        boardId: card.boardId,
        cardId: card._id,
      }, hanldeClose);
    }
    addNewCardAction({
      header,
      tags,
      description,
      boardId: card.boardId,
    }, hanldeClose);
  }

  return (
    <ReactModal
      isOpen={isOpen}
      style={customStyles}
      onRequestClose={hanldeClose}
    >
      <div onClick={() => hanldeClose()} className="close-moda-btn">
        <div>
          <img src={closeIcon} alt="close" className={"close-modal-icon"}/>
        </div>
      </div>
      <hr />
      <div className="input-group-wrapp">
        <div className="modal-inputs-group">
          <form onSubmit={hanldeAddNewCard} className="modal-inputs-group-form">
            <input
              required
              value={header}
              onChange={({ target }) => setHeader(target.value)}
              placeholder="Card header"
              className="text-input"
              type="text"
            />
            <label htmlFor="card-description">Card description:</label>
            <textarea
              id="card-description"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
              name="description"
              placeholder="card-description"
              rows="5"
              cols="33"
            />

            <div className="modal-inputs-group-tags">
              {tags.map(({ name, checked }) => (
                <div key={name} className="modal-inputs-group-checkbox-wrapp">
                  <input
                    onChange={hanldeChecked}
                    checked={checked}
                    type="checkbox"
                    name={name}
                    id={name}
                  />
                  <label htmlFor={name}>{name}</label>
                </div>
              ))}
            </div>

            <button type="submit" className="modal-inputs-goroup-send-btn">
              {cardLoading ? "LOADING..." : isUpdateModal ? "UPDATE" : "SEND"}
            </button>
          </form>
        </div>
      </div>
    </ReactModal>
  );
};

const mapStateToProps = (state) => {
  return {
    isOpen: state.boardReducer.isModalOpen,
    isUpdateModal: state.boardReducer.isUpdateModal,
    card: state.boardReducer.card,
    cardLoading: state.boardReducer.cardLoading,
  };
};

const mapDispatchToProps = {
  toggleModal,
  addNewCardAction,
  updateExistsCard,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
