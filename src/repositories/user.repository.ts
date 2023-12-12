import connection from "../database/index";
import User from "../models/user.model";

interface IUserRepository {
    get(id: number): Promise<User | undefined>;

    create(user: User): Promise<User>;

    update(user: User): Promise<number>;

    delete(id: number): Promise<number>;
}

class UserRepository implements IUserRepository {

    get(id: number): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
                "SELECT * FROM user WHERE id = ?",
                [id],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else resolve(res?.[0]);
                }
            );
        });
    }

    getByUsername(username: string): Promise<User | undefined> {
        return new Promise((resolve, reject) => {
            connection.query<User[]>(
                "SELECT * FROM user WHERE username = ?",
                [username],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else resolve(res?.[0]);
                }
            );
        });
    }

    create(user: any): Promise<User> {
        return new Promise((resolve, reject) => {
            connection.query(
                "INSERT INTO user (`name`, `username`, `password`) VALUES (?, ?, ?)",
                [user.name, user.username, user.password],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else
                        this.get(res.insertId)
                            .then((user) => resolve(user!))
                            .catch(reject);
                }
            );
        });
    }

    update(user: User): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query(
                "UPDATE user SET name = ?, username = ?, password = ?, refresh_token = ? WHERE id = ?",
                [user.name, user.username, user.password, user.refresh_token, user.id],
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
                "DELETE FROM user WHERE id = ?",
                [id],
                (err: any, res: any) => {
                    if (err) reject(err);
                    else resolve(res.affectedRows);
                }
            );
        });
    }

    deleteAll(): Promise<number> {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM user", (err: any, res: any) => {
                if (err) reject(err);
                else resolve(res.affectedRows);
            });
        });
    }
}

export default new UserRepository();