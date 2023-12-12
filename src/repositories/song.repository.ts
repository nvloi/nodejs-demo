import connection from "../database/index";
import Song from "../models/song.model";

interface ISongRepository {
    getAll(searchParams: { name: string, duration: boolean }): Promise<Song[]>;

    get(id: number): Promise<Song | undefined>;

    create(song: Song): Promise<Song>;

    update(song: Song): Promise<number>;

    delete(id: number): Promise<number>;
}

class SongRepository implements ISongRepository {

    getAll(searchParams: { name?: string, duration?: boolean }): Promise<Song[]> {
        let query: string = "SELECT * FROM song";
        let condition: string = "";

        if (searchParams?.name)
            condition += `name = '${searchParams.name}'`;

        if (searchParams?.duration)
            condition += `duration = '${searchParams.duration}'`;

        if (condition.length)
            query += " WHERE " + condition;

        return new Promise((resolve, reject) => {
            connection.query<Song[]>(query, (err: any, res: any) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    get(id: number): Promise<Song | undefined> {
        return new Promise((resolve, reject) => {
            connection.query<Song[]>(
                "SELECT * FROM song WHERE id = ?",
                [id],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else resolve(res?.[0]);
                }
            );
        });
    }

    create(song: Song): Promise<Song> {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO song (album_id, name, duration) VALUES(?, ?,?)",
                [song.album_id, song.name, song.duration],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else
                        this.get(res.insertId)
                            .then((song) => resolve(song!))
                            .catch(reject);
                }
            );
        });
    }

    update(song: Song): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE song SET name = ?, duration = ? WHERE id = ?",
                [song.name, song.duration, song.id],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else resolve(res.affectedRows);
                }
            );
        });
    }

    delete(id: number): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query(
                "DELETE FROM song WHERE id = ?",
                [id],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else resolve(res.affectedRows);
                }
            );
        });
    }
}

export default new SongRepository();