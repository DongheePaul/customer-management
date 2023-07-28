import React from "react";
import "./App.css";
import Customer from "./page/Customer";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./page/Login";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Customer />} />
          <Route path="/signup" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
