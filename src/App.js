// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Lobby from "./pages/Lobby";
import "./App.css";

const App = () => {
    
return (
    <Router>
      <Routes>
        <Route path="/" element={<Lobby />} />
      </Routes>
    </Router>
  );
};

export default App; // Ensure it’s exported
