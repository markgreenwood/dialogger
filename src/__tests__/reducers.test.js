import { expect } from "chai";
import { combineReducers } from "redux";

import { activeThreadId, threads } from "../reducers";

const reducer = combineReducers({
  activeThreadId,
  threads
});

describe("reducer", () => {
  const preexistingMessage = {
    text: "Pre-existing message",
    id: "a1234",
    timestamp: Date.now()
  };

  const initialState = {
    activeThreadId: "1",
    threads: [
      {
        id: "1",
        messages: [preexistingMessage]
      },
      {
        id: "2",
        messages: []
      }
    ]
  };

  const addAction = { type: "ADD_MESSAGE", text: "Hello", threadId: "1" };
  const deleteAction = { type: "DELETE_MESSAGE", id: "a1234" };

  it("should keep original messages", () => {
    expect(
      reducer(initialState, addAction).threads.find(t => t.id === "1").messages
    ).to.contain(preexistingMessage);
  });

  it("should add a new message", () => {
    const theThread = reducer(initialState, addAction).threads.find(
      t => t.id === "1"
    );
    const result = theThread.messages.find(m => m.text === "Hello");
    expect(result).to.be.ok; // eslint-disable-line no-unused-expressions
    expect(result).to.have.property("timestamp");
    expect(result).to.have.property("id");
  });

  it("should delete a message", () => {
    const theThread = reducer(initialState, deleteAction).threads.find(
      t => t.id === "1"
    );
    expect(theThread.messages).to.be.empty; // eslint-disable-line no-unused-expressions
  });

  it('should switch threads', () => {
    expect(reducer(initialState, { type: "OPEN_THREAD", id: "2" }).activeThreadId).to.equal("2");
  });
});
