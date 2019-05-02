import { connect } from "react-redux";

import Thread from "../components/Thread";
import { addMessage, deleteMessage } from "../actions";

const mapStateToThreadProps = state => ({
  thread: state.threads.find(t => t.id === state.activeThreadId)
});

const mapDispatchToProps = dispatch => ({
  onMessageClick: id => dispatch(deleteMessage(id)),
  dispatch
});

const mergeProps = (stateProps, dispatchProps) => ({
  ...stateProps,
  ...dispatchProps,
  onMessageSubmit: text =>
    dispatchProps.dispatch(addMessage(text, stateProps.thread.id))
});

const ThreadDisplay = connect(
  mapStateToThreadProps,
  mapDispatchToProps,
  mergeProps
)(Thread);

export default ThreadDisplay;
