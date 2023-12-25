// customRequest.ts
import { Request } from "express";
import { UserPayload } from "./userPayload";

export interface UserRequest extends Request {
  user?: UserPayload;
}
