import connection from "../database/index";
import Album from "../models/album.model";

interface ISAlbumRepository {
    getAll(searchParams: { name: string, duration: boolean }): Promise<Album[]>;

    get(id: number): Promise<Album | undefined>;

    create(album: Album): Promise<Album>;

    update(album: Album): Promise<number>;

    delete(id: number): Promise<number>;
}

class AlbumRepository implements ISAlbumRepository {

    getAll(searchParams: { name?: string, duration?: boolean }): Promise<Album[]> {
        let query: string = "SELECT * FROM album";
        let condition: string = "";

        if (searchParams?.name)
            condition += `name = '${searchParams.name}'`;

        if (searchParams?.duration)
            condition += `duration = '${searchParams.duration}'`;

        if (condition.length)
            query += " WHERE " + condition;

        return new Promise((resolve, reject) => {
            connection.query<Album[]>(query, (err: any, res: any) => {
                if (err) reject(err);
                else resolve(res);
            });
        });
    }

    get(id: number): Promise<Album | undefined> {
        return new Promise((resolve, reject) => {
            connection.query<Album[]>(
                "SELECT * FROM album WHERE id = ?",
                [id],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else resolve(res?.[0]);
                }
            );
        });
    }

    create(album: Album): Promise<Album> {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO album (album_id, name, duration) VALUES(?, ?,?)",
                [album.album_id, album.name, album.duration],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else
                        this.get(res.insertId)
                            .then((album) => resolve(album!))
                            .catch(reject);
                }
            );
        });
    }

    update(album: Album): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE album SET name = ?, duration = ? WHERE id = ?",
                [album.name, album.duration, album.id],
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
                "DELETE FROM album WHERE id = ?",
                [id],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else resolve(res.affectedRows);
                }
            );
        });
    }
}

export default new AlbumRepository();