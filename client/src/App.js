import React, { Component } from "react";
import "./App.css";
import Customer from "./components/Customer";
import Mypage from "./page/mypage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>{" "}
              {/* Link 컴포넌트를 이용하여 경로를 연결한다 */}
            </li>
            <li>
              <Link to="/customer">Customer</Link>
            </li>
            <li>
              <Link to="/mypage">Mypage</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/mypage" element={<Mypage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
function Home() {
  return <h1>Home</h1>;
}
export default App;
