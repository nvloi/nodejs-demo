import {Model, DataTypes} from 'sequelize';
import {sequelize} from "./index";

interface AlbumAttributes {
    id: number;
    name: string;
    year: number;
}

class AlbumModel extends Model<AlbumAttributes> implements AlbumAttributes {
    public id!: number;
    public name!: string;
    public year!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

AlbumModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        year: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'album',
        timestamps: true,
        underscored: true,
    }
);

export default AlbumModel;