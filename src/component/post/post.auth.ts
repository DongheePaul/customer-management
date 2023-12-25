import { m_post } from "../../model"; // 실제 경로에 맞게 조정 필요

const postAuth = async (post_id: number, user_id: number): Promise<boolean> => {
  const sql = `select author_id from posts where id = ${post_id}`;
  const result = await m_post.read(sql);
  if (result.length > 0 && result[0].author_id === user_id) {
    console.log("post auth success");
    return true;
  } else {
    console.log("post auth failed");
    return false;
  }
};

export { postAuth };
