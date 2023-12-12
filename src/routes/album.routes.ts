import { Router } from 'express';
import AlbumController from "../controllers/album.controller";
import {isAuth} from "../middlewares/auth.middleware";

class AlbumRoutes {
  router = Router();
  controller = new AlbumController();
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", isAuth, this.controller.findAll);
    this.router.get("/:id", isAuth, this.controller.findOne);
  }
}

export default new AlbumRoutes().router