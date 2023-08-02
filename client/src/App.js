import React from "react";
import "./App.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Member from "./page/Member";
import Login from "./page/Login";
import BoardList from "./page/BoardList";
import WritePost from "./components/WritePost";
import PostDetail from "./page/PostDetail";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Member />} />
          <Route path="/login" element={<Login />} />
          <Route path="/board" element={<BoardList />} />
          <Route path="/write" element={<WritePost />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export default App;
