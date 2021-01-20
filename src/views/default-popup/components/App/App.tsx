import React from "react";
import GlobalStyles from "@/views/default-popup/styles/global-styles";

const App = (): JSX.Element => {
  return (
    <div>
      <GlobalStyles />
      <aside className="full_aside">
        <h1 className="content">
          Hey!
        </h1>
      </aside>
    </div>
  );
};

export default App;