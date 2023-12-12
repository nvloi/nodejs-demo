import { RowDataPacket } from "mysql2"

export default interface Song extends RowDataPacket {
  id: number;
  album_id: number;
  name: string;
  duration: string;
}
