import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import boardReducer from "./reducers/board-reducer";
import searchBarReducer from "./reducers/searchbar-reducer";
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  boardReducer,
  searchBarReducer,
});

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(reduxThunk))
);

export default store;
