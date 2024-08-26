import { Router } from "express";

import UserController from "../controllers/UserController.js";

const router = new Router();

router.get("/api/user/email/:email", UserController.findByEmail);
