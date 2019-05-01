// Action creators

function deleteMessage(id) {
  return {
    type: "DELETE_MESSAGE",
    id
  };
}

function addMessage(text, threadId) {
  return {
    type: "ADD_MESSAGE",
    text,
    threadId
  };
}

function openThread(id) {
  return {
    type: "OPEN_THREAD",
    id
  };
}

export {
  addMessage,
  deleteMessage,
  openThread
};
