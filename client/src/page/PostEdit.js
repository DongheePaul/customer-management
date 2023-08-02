import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostEdit = () => {
  const { id } = useParams();
  const [editedPost, setEditedPost] = useState({
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPost();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    //구조분해 할당
    setEditedPost({
      ...editedPost,
      [name]: value,
    });
  };
  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setEditedPost({
          title: data[0].title,
          content: data[0].content,
        });
      } else {
        console.error("게시물 데이터 가져오기 실패:", response.status);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedPost),
      });
      if (response.ok) {
        navigate("/board");
      } else {
        console.error("게시물 수정 실패:", response.status);
      }
    } catch (error) {
      console.error("에러:", error);
    }
  };

  return (
    <div>
      <h2>게시물 수정</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={editedPost.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={editedPost.content}
            onChange={handleChange}
          />
        </div>
        {/* Add other form fields for other properties */}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostEdit;
