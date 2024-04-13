import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./redux/Store.js";
import { Provider } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NextUIProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App /> 
      </PersistGate>
    </Provider>
  </NextUIProvider>
);
reportWebVitals();
