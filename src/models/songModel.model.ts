import {Model, DataTypes} from 'sequelize';
import {sequelize} from "./index";

interface SongAttributes {
    id: number;
    album_id: number;
    name: string;
    duration: number;
}

class SongModel extends Model<SongAttributes> implements SongAttributes {
    public id!: number;
    public album_id!: number;
    public name!: string;
    public duration!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

SongModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        album_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        duration: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'song',
        timestamps: true,
        underscored: true,
    }
);

export default SongModel;