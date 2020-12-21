import React from "react";
import ReactDOM from "react-dom";
import GlobalStyles from "./global-styles";

const App = () => {
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

ReactDOM.render(
    <App />,
    document.getElementById("app")
);