import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/BoardList.css"; // Import custom CSS for styling

const BoardList = () => {
  const [boards, setBoards] = useState([]);

  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    fetchBoards();
  }, []);

  const fetchBoards = async () => {
    try {
      const response = await fetch("/api/posts");
      if (response.ok) {
        const data = await response.json();
        setBoards(data);
      } else {
        console.error("게시판 데이터 가져오기 실패:", response.status);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("ko-KR", options);
  };

  return (
    <div className="board-list-container">
      <h2 className="board-list-heading">게시판 목록</h2>
      {authToken && (
        <Link to="/write">
          <button className="btn-write">글쓰기</button>
        </Link>
      )}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>제목</th>
            <th>작성자</th>
            <th>작성일</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board) => (
            <tr key={board.id}>
              <td>{board.id}</td>
              <td>
                <Link to={`/posts/${board.id}`}>{board.title}</Link>
              </td>
              <td>{board.author_id}</td>
              <td>{formatDate(board.created_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardList;
