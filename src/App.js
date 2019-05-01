import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider, connect } from "react-redux";

import { activeThreadId, threads } from "./reducers";

const reducer = combineReducers({
  activeThreadId: activeThreadId,
  threads: threads
});

const store = createStore(reducer);

const MessageList = props => (
  <div className="ui comments">
    {props.messages.map((m, index) => (
      <div className="comment" key={index} onClick={() => props.onClick(m.id)}>
        <div className="text">
          {m.text} <span className="metadata">@{m.timestamp}</span>
        </div>
      </div>
    ))}
  </div>
);

class TextFieldSubmit extends React.Component {
  state = {
    value: ""
  };

  onChange = e => this.setState({ value: e.target.value });

  handleSubmit = () => {
    this.props.onSubmit(this.state.value);
    this.setState({ value: "" });
  };

  render() {
    return (
      <div className="ui input">
        <input onChange={this.onChange} value={this.state.value} type="text" />
        <button
          className="ui  primary button"
          onClick={this.handleSubmit}
          type="submit"
        >
          Submit
        </button>
      </div>
    );
  }
}

const Thread = props => (
  <div className="ui center aligned basic segment">
    <MessageList
      messages={props.thread.messages}
      onClick={props.onMessageClick}
    />
    <TextFieldSubmit onSubmit={props.onMessageSubmit} />
  </div>
);

const mapStateToThreadProps = state => ({
  thread: state.threads.find(t => t.id === state.activeThreadId)
});

const mapDispatchToThreadProps = dispatch => ({
  onMessageClick: id => store.dispatch({ type: "DELETE_MESSAGE", id }),
  dispatch
});

const mergeThreadProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onMessageSubmit: text =>
    dispatchProps.dispatch({
      type: "ADD_MESSAGE",
      text,
      threadId: stateProps.thread.id
    })
});

const ThreadDisplay = connect(
  mapStateToThreadProps,
  mapDispatchToThreadProps,
  mergeThreadProps
)(Thread);

const Tabs = props => (
  <div className="ui top attached tabular menu">
    {props.tabs.map((tab, index) => (
      <div
        key={index}
        className={tab.active ? "active item" : "item"}
        onClick={() => props.onClick(tab.id)}
      >
        {tab.title}
      </div>
    ))}
  </div>
);

const mapStateToTabsProps = state => {
  const tabs = state.threads.map(t => ({
    title: t.title,
    active: t.id === state.activeThreadId,
    id: t.id
  }));

  return {
    tabs
  };
};

const mapDispatchToTabsProps = dispatch => ({
  onClick: id =>
    dispatch({
      type: "OPEN_THREAD",
      id
    })
});

const ThreadTabs = connect(
  mapStateToTabsProps,
  mapDispatchToTabsProps
)(Tabs);

const App = () => (
  <div className="ui segment">
    <ThreadTabs />
    <ThreadDisplay />
  </div>
);

const WrappedApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default WrappedApp;
