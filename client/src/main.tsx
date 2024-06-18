import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
// redux imports
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
// redux persist imports
// import { persistStore } from "redux-persist";
// import { PersistGate } from "redux-persist/integration/react";
// let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      {/*<PersistGate persistor={persistor}>*/}
        <App />
      {/*</PersistGate>*/}
    </Provider>
  </React.StrictMode>
);
