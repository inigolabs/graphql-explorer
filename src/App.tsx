import "./App.css";

import Explorer from "./lib/Explorer/Explorer";

function App() {
  return (
    <Explorer
      defaultState={{
        url: "https://staging.inigo.io/api/query",
      }}
      access="admin"
    />
  );
}

export default App;
