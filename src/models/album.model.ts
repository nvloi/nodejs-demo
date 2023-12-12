import { RowDataPacket } from "mysql2"

export default interface Album extends RowDataPacket {
  id: number;
  name: string;
}