import { connect } from "react-redux";

import { openThread } from "../actions";
import Tabs from "../components/Tabs";

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
  onClick: id => dispatch(openThread(id))
});

const ThreadTabs = connect(
  mapStateToTabsProps,
  mapDispatchToTabsProps
)(Tabs);

export default ThreadTabs;