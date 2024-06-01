import React from "react"
import ReactDOM from "react-dom/client"
import App from "./app"
import "./styles/index.sass"
import store from "./store/store"
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
)
