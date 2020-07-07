import { normalize, schema } from "normalizr";

const node = new schema.Entity("node", {}, { idAttribute: "_id" });

node.define({
  child: [node],
});
const treeSchema = [node];

const initialState = {
  boards: [],
  isModalOpen: false,
  card: {},
  loading: false,
  error: null,
  isUpdateModal: false,
  cardLoading: false,
  cardError: null,
};

const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_BOARD_ACTION_REQUEST": {
      return {
        ...state,
        loading: true,
      };
    }

    case "GET_BOARD_ACTION_SUCCESS": {
      return {
        ...state,
        loading: false,
        boards: normalize(action.payload, treeSchema),
      };
    }

    case "GET_BOARD_ACTION_FAILURE": {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    case "UPDATE_EXISTS_CARD": {
      const { data: card } = action.payload;
      const board = state.boards.entities.node[card.boardId];
      const cardIndex = board.cards.findIndex((el) => el._id === card._id);
      return {
        ...state,
        cardLoading: false,
        boards: {
          ...state.boards,
          entities: {
            node: {
              ...state.boards.entities.node,
              [card.boardId]: {
                ...board,
                cards: [
                  ...board.cards.slice(0, cardIndex),
                  { ...board.cards[cardIndex], ...card },
                  ...board.cards.slice(cardIndex + 1),
                ],
              },
            },
          },
        },
      };
    }

    case "ADD_NEW_CARD_REQUEST": {
      return {
        ...state,
        cardLoading: true,
      };
    }

    case "ADD_NEW_CARD_SUCCESS": {
      const { data: card } = action.payload;
      const board = state.boards.entities.node[card.boardId];

      return {
        ...state,
        cardLoading: false,
        boards: {
          ...state.boards,
          entities: {
            node: {
              ...state.boards.entities.node,
              [card.boardId]: {
                ...board,
                cards: [...board.cards, card],
              },
            },
          },
        },
      };
    }

    case "ADD_NEW_CARD_FAILURE": {
      return {
        ...state,
        cardLoading: false,
        cardError: true,
      };
    }

    case "TOGGLE_MODAL": {
      const { isUpdateModal, isOpen, card } = action.payload;
      return {
        ...state,
        isModalOpen: isOpen,
        isUpdateModal,
        card,
      };
    }

    case "ON_CARD_DROPPED":
      const { newBoardId, oldBoardId, cardId } = action.payload;
      const boards = state.boards.entities.node;
      const board = boards[oldBoardId];
      const newBoard = boards[newBoardId];

      // find the dragged card
      const card = board.cards.find((card) => card._id === cardId);
      card.boardId = newBoardId
      // remove card from current board
      const removedCardFromBoard = {
        ...board,
        cards: board.cards.filter((card) => card._id !== cardId),
      };

      // add card to new board
      const addCardToNewBoard = {
        ...newBoard,
        cards: [...newBoard.cards, card],
      };

      return {
        ...state,
        boards: {
          ...state.boards,
          entities: {
            node: {
              ...state.boards.entities.node,
              [newBoardId]: addCardToNewBoard,
              [oldBoardId]: removedCardFromBoard,
            },
          },
        },
      };
    default:
      return state;
  }
};

export default boardReducer;
