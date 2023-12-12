import {Request, Response} from 'express';
import songRepository from '../repositories/song.repository';
import SongModel from '../models/songModel.model';
import {getPagination} from "../methods/pagination.methods";

export default class SongController {

    async findAll(req: Request, res: Response) {
        try {
            const {limit, offset} = getPagination(req.query);
            let condition = {};
            if (req.query.album_id) {
                condition = {
                    album_id: req.query.album_id
                }
            }

            const songs = await SongModel.findAndCountAll({where: condition, limit, offset})
                .then(data => {
                    return data;
                })
                .catch(err => {
                    return err;
                });
            res.status(200).json({
                message: "success",
                count: songs.count,
                data: songs.rows,
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
            const song = await songRepository.get(parseInt(id));
            res.status(200).json({
                message: "success",
                reqParamId: req.params.id,
                data: song,
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async create(req: Request, res: Response) {
        try {
            await songRepository.create(req.body);
            res.status(201).json({
                message: "success",
                data: req.body
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const {id} = req.params;
            const data = req.body;
            await songRepository.update({...data, id})
            res.status(200).json({
                message: "success",
                reqParamId: req.params.id,
                data: req.body
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const {id} = req.params;
            await songRepository.delete(parseInt(id));
            res.status(200).json({
                message: "success",
                reqParamId: req.params.id
            });
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "Internal Server Error!"
            });
        }
    }

}