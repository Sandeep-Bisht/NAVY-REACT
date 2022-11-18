import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoute from "./Routes/Route.js";
import "./App.css";

function App() {
  return (
    <Router>
      
      <AppRoute></AppRoute>
    </Router>
  );
}

export default App;
