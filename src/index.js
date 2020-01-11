import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import WizardForm from "./WizardForm";

const rootEl = document.getElementById("root");

ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <h2>Wizard Example</h2>
      <WizardForm/>
    </div>
  </Provider>,
  rootEl
);
