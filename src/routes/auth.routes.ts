import { Router } from "express";
import {login, refreshToken, register} from "../controllers/auth.controller";

class AuthRoutes {
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.post("/login", login);
    this.router.post('/register', register);
    this.router.post('/refresh-token', refreshToken);
  }
}

export default new AuthRoutes().router;