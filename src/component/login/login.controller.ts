import { Request, Response, NextFunction } from "express";
import { m_member } from "../../model"; // 실제 경로에 맞게 조정 필요
import { jwtHelper } from "../../middlewares"; // 실제 경로에 맞게 조정 필요

const read = async (req: Request, res: Response, next: NextFunction) => {
  const params = [req.body.username, req.body.password];

  // Prepared Statement 쿼리 생성
  const sql = "SELECT * FROM members WHERE name = ? AND password = ?";
  try {
    const results = await m_member.read(sql, params);
    const token = jwtHelper.generateToken(results[0].id, results[0].name);
    res.status(200).json({ success: true, token: token });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
};

export { read };
