import {Request, Response} from 'express';
import {getPagination} from "../methods/pagination.methods";
import AlbumModel from "../models/albumModel.model";
import songRepository from "../repositories/song.repository";

export default class AlbumController {

    async findAll(req: Request, res: Response) {
        try {
            const {limit, offset} = getPagination(req.query);
            let condition = {};
            const albums = await AlbumModel.findAndCountAll({where: condition, limit, offset})
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return err;
                });
            res.status(200).json({
                message: "success",
                count: albums.count,
                data: albums.rows,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async findOne(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const album = await AlbumModel.findOne({ where: { id: id } });
            res.status(200).json({
                message: "success",
                data: album,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

}