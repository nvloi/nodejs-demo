import { Router } from 'express';
import SongController from '../controllers/song.controller';
import {isAuth} from "../middlewares/auth.middleware";

class SongRoutes {
  router = Router();
  controller = new SongController();
  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", isAuth, this.controller.findAll);
    this.router.get("/:id", isAuth, this.controller.findOne);
    this.router.post("/", isAuth,  this.controller.create);
    this.router.put("/:id", isAuth, this.controller.update);
    this.router.delete("/:id", isAuth, this.controller.delete);
  }
}

export default new SongRoutes().router