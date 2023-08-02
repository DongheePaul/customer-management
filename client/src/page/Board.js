import React from "react";

const BoardList = () => {
  const boards = [
    { id: 1, title: "게시글 1", author: "작성자1", date: "2023-07-28" },
    { id: 2, title: "게시글 2", author: "작성자2", date: "2023-07-29" },
    { id: 3, title: "게시글 3", author: "작성자3", date: "2023-07-30" },
  ];

  return (
    <div>
      <h2>게시판 목록</h2>
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
