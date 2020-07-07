import Axios from "axios";
import { batch } from "react-redux";

const getBoardActionRequest = () => {
  return {
    type: "GET_BOARD_ACTION_REQUEST",
  };
};

const getBoardActionSuccess = (boards) => {
  return {
    type: "GET_BOARD_ACTION_SUCCESS",
    payload: boards,
  };
};

const getBoardActionFailure = (err) => {
  return {
    type: "GET_BOARD_ACTION_FAILURE",
    payload: err,
  };
};

export const fetchBoards = () => (dispatch) => {
  dispatch(getBoardActionRequest());
  Axios.get("/boards")
    .then(({ data }) => {
      dispatch(getBoardActionSuccess(data));
    })
    .catch((err) => dispatch(getBoardActionFailure(err)));
};

export const onCardDropped = (oldBoardId, newBoardId, cardId) => (dispatch) => {
  Axios.patch("/boards/update", {
    newBoardId,
    oldBoardId,
    cardId,
  })
    .then(() => {
      dispatch({
        type: "ON_CARD_DROPPED",
        payload: { newBoardId, oldBoardId, cardId },
      });
    })
    .catch((err) => console.error(err));
};

const addNewCardActionRequest = () => {
  return {
    type: "ADD_NEW_CARD_REQUEST",
  };
};

const addNewCardActionSuccess = (card) => {
  return {
    type: "ADD_NEW_CARD_SUCCESS",
    payload: card,
  };
};

const addNewCardActionFailure = (err) => {
  return {
    type: "ADD_NEW_CARD_FAILURE",
    payload: err,
  };
};

export const addNewCardAction = (card, closeModal) => (dispatch) => {
  dispatch(addNewCardActionRequest());
  Axios.post("/cards", { card })
    .then(({ data }) => {
      dispatch(addNewCardActionSuccess({ data }));
      closeModal();
    })
    .catch((err) => dispatch(addNewCardActionFailure(err)));
};

const updateExistsCardAction = (card) => {
  return {
    type: "UPDATE_EXISTS_CARD",
    payload: card,
  };
};

export const updateExistsCard = (card, closeModal) => (dispatch) => {
  dispatch(addNewCardActionRequest());
  Axios.patch("/cards/update", { card })
    .then(({ data }) => {
      dispatch(updateExistsCardAction({ data }));
      closeModal();
    })
    .catch((err) => addNewCardActionFailure(err));
};

export const toggleModal = (isOpen, isUpdateModal = false, card = {}) => {
  return {
    type: "TOGGLE_MODAL",
    payload: { isOpen, isUpdateModal, card },
  };
};
