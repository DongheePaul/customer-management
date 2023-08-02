import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/PostDetail.css"; // Import custom CSS for styling

const PostDetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    // Fetch the post data from the server based on the post ID
    fetchPost();
  }, []);

  const fetchPost = async () => {
    try {
      const response = await fetch(`/api/posts/${id}`);
      if (response.ok) {
        const data = await response.json();
        setPost(data);
      } else {
        console.error("게시물 데이터 가져오기 실패:", response.status);
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
    <div className="post-detail-container">
      <h2 className="post-detail-title">{post.title}</h2>
      <p className="post-detail-author">작성자: {post.author_id}</p>
      <p className="post-detail-date">작성일: {formatDate(post.created_at)}</p>
      <p className="post-detail-content">{post.content}</p>
    </div>
  );
};

export default PostDetail;
