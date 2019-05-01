import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import "./semantic-dist/semantic.min.css";

import { activeThreadId, threads } from "./reducers";

import App from "./App";

const store = createStore(
  combineReducers({
    activeThreadId: activeThreadId,
    threads: threads
  })
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
