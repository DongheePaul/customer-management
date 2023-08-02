import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/WritePost.css";

const WritePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 작성한 글 데이터를 서버로 전송하는 코드 작성
    const formData = {
      title: title,
      content: content,
    };
    const authToken = localStorage.getItem("authToken");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate("/");
      } else {
        console.error("글 작성 실패:", response.status);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <div className="write-post-container">
      <h2>글쓰기</h2>
      <form onSubmit={handleSubmit} className="write-post-form">
        <div className="form-group">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
          ></textarea>
        </div>
        <button type="submit" className="btn-submit">
          작성 완료
        </button>
      </form>
    </div>
  );
};

export default WritePost;
