import React from "react";

import ThreadDisplay from "./containers/ThreadDisplay";
import ThreadTabs from "./containers/ThreadTabs";

const App = () => (
  <div className="ui segment">
    <ThreadTabs />
    <ThreadDisplay />
  </div>
);

export default App;
