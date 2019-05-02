import { connect } from "react-redux";

import { openThread } from "../actions";
import Tabs from "../components/Tabs";

const mapStateToProps = state => {
  const tabs = state.threads.map(t => ({
    title: t.title,
    active: t.id === state.activeThreadId,
    id: t.id
  }));

  return {
    tabs
  };
};

const mapDispatchToProps = dispatch => ({
  onClick: id => dispatch(openThread(id))
});

const ThreadTabs = connect(
  mapStateToProps,
  mapDispatchToProps
)(Tabs);

export default ThreadTabs;