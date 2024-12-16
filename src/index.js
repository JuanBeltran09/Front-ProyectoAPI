// src/index.js
import "bootstrap/dist/css/bootstrap.min.css"; // Importa estilos de Bootstrap
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
