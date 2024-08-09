import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { HomeScreen } from "./components/home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeScreen />} /> {/* Default route */}
        <Route path="/home" element={<HomeScreen />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
