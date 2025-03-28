import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import "./style.css"

import { BrowserRouter } from "react-router-dom"
import CartContext from "./contextAPI/CartContext"


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartContext>
        <App />
      </CartContext>
    </BrowserRouter>
  </React.StrictMode>
)