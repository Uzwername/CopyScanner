import React from "react";
import GlobalStyles from "@/views/default-popup/styles/global-styles";
import Popup from "@/views/default-popup/components/Popup/Popup";

const App = (): JSX.Element => {
  return (
    <div>
      <GlobalStyles />
      <aside className="full_aside">
        <h1 className="content">
          <Popup />
        </h1>
      </aside>
    </div>
  );
};

export default App;