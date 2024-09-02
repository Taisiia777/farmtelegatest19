import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { TonConnectUIProvider } from '@tonconnect/ui-react';

import App from "./App";

import store from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <Provider store={store}>
         <TonConnectUIProvider manifestUrl={'https://raw.githubusercontent.com/Sanch3zCode/mnf/main/manifest.json'}>
            <App />
         </TonConnectUIProvider>
      </Provider>
   </React.StrictMode>
);
