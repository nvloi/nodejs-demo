import { RowDataPacket } from "mysql2"

export default interface User extends RowDataPacket {
  id: number;
  name: string;
  username: string;
  password: string;
  refresh_token: string;
}