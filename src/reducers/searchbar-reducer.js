const initialState = {
  searchBarValue: "",
};

export default function searchBarReducer(state = initialState, action) {
  switch (action.type) {
    case "SEARCH_INPUT_VALUE":
      return {
        ...state,
        searchBarValue: action.payload,
      };

    default:
      return state;
  }
}
