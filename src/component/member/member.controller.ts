import { Request, Response, NextFunction } from "express";
import { File } from "multer";
import { m_member } from "../../model"; // 실제 경로에 맞게 조정 필요

interface CustomRequest extends Request {
  file?: File;
}

const read = async (req: Request, res: Response, next: NextFunction) => {
  const query = "select * from members where is_deleted = 0";
  const results = await m_member.read(query);
  res.json(results);
};

const create = async ( req: CustomRequest,  res: Response,  next: NextFunction) => {
  let sql = "insert into members values (null, ?, ?, ?, ?, 0, 0, now(), null)";
  let image = "http://localhost:3001/image/" + req.file.filename;
  let name = req.body.name;
  let password = req.body.password;
  let gender = req.body.gender;
  let params = [image, name, password, gender];
  const results = await m_member.create(sql, params);
  res.json(results);
};

const deleteMember = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let sql = "UPDATE members SET is_deleted = 1 WHERE id = ?";
  let params = [req.params.id];
  const results = await m_member.delete(sql, params);
  res.json(results);
};

export { read, create, deleteMember as delete };
