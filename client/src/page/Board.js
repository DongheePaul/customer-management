import React from "react";
import { Link } from "react-router-dom";

const BoardList = () => {
  const boards = [
    { id: 1, title: "게시글 1", author: "작성자1", date: "2023-07-28" },
    { id: 2, title: "게시글 2", author: "작성자2", date: "2023-07-29" },
    { id: 3, title: "게시글 3", author: "작성자3", date: "2023-07-30" },
  ];

  // 로컬 스토리지에서 authToken 가져오기
  const authToken = localStorage.getItem("authToken");

  return (
    <div>
      <h2>게시판 목록</h2>
      {/* authToken이 있으면 글쓰기 버튼을 보여주고, 없으면 숨김 */}
      {authToken && (
        <Link to="/write">
          <button>글쓰기</button>
        </Link>
      )}
      <table>
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
              <td>{board.title}</td>
              <td>{board.author}</td>
              <td>{board.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BoardList;
