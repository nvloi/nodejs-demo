import { verifyToken } from '../methods/auth.methods';
import userRepository from "../repositories/user.repository";
import {authConfig} from "../config/auth";

export async function isAuth(req: any, res: any, next: any) {
  // Lấy access token từ header
  const accessTokenFromHeader = req.headers.authorization;
  if (!accessTokenFromHeader) {
    return res.status(401).send('Không tìm thấy access token!');
  }
  const verified = verifyToken(
      accessTokenFromHeader.split(' ')[1],
      authConfig.ACCESS_TOKEN_SECRET
  );
  if (!verified) {
    return res.status(401).json("Bạn không có quyền truy cập vào tính năng này!");
  }

  const user = await userRepository.get(verified.payload.username);
  req.user = user;

  return next();
};