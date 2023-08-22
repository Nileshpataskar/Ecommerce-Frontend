import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux"; // Import Provider
import store from "./Redux/store"; // Import the Redux store

ReactDOM.render(
  <Auth0Provider
    domain="dev-ud27ha3qp4spv3yj.us.auth0.com"
    clientId="KPCDD2HAbYoiAHbnVmzVjMTrDL8nD4At"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <React.StrictMode>
        <Provider store={store}>
          {/* Wrap App with Provider */}
          <App />
        </Provider>
      </React.StrictMode>
    </BrowserRouter>
  </Auth0Provider>,
  document.getElementById("root")
);
