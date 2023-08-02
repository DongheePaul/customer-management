import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Member from "./page/Member";
import Login from "./page/Login";
import Board from "./page/Board";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Member />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
