import React from "react";
import { createStore, combineReducers } from "redux";

import { activeThreadId, threads } from "./reducers";

const reducer = combineReducers({
  activeThreadId: activeThreadId,
  threads: threads
});

const store = createStore(reducer);

class Thread extends React.Component {
  handleClick = id =>
    store.dispatch({
      type: "DELETE_MESSAGE",
      id
    });

  render() {
    const messages = this.props.thread.messages.map((m, index) => (
      <div
        className="comment"
        key={index}
        onClick={() => this.handleClick(m.id)}
      >
        <div className="text">
          {m.text} <span className="metadata">@{m.timestamp}</span>
        </div>
      </div>
    ));

    return (
      <div className="ui center aligned basic segment">
        <div className="ui comments">{messages}</div>
        <MessageInput threadId={this.props.thread.id} />
      </div>
    );
  }
}

class MessageInput extends React.Component {
  state = {
    value: ""
  };

  onChange = e => this.setState({ value: e.target.value });

  handleSubmit = () => {
    store.dispatch({
      type: "ADD_MESSAGE",
      text: this.state.value,
      threadId: this.props.threadId
    });
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

class ThreadTabs extends React.Component {
  render() {
    const tabs = this.props.tabs.map((tab, index) => (
      <div
        key={index}
        className={tab.active ? "active item" : "item"}
        onClick={() => store.dispatch({ type: "OPEN_THREAD", id: tab.id })}
      >
        {tab.title}
      </div>
    ));

    return <div className="ui top attached tabular menu">{tabs}</div>;
  }
}

class App extends React.Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  render() {
    const state = store.getState();
    const activeThreadId = state.activeThreadId;
    const threads = state.threads;
    const activeThread = threads.find(t => t.id === activeThreadId);
    const tabs = threads.map(t => ({
      title: t.title,
      active: t.id === activeThreadId,
      id: t.id
    }));

    return (
      <div className="ui segment">
        <ThreadTabs tabs={tabs} />
        <Thread thread={activeThread} />
      </div>
    );
  }
}

export default App;
