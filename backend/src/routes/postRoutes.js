import express from 'express';
import { PostController } from '../controllers/postController.js';
import { UserService } from '../services/userService.js';

const postRoutes = express.Router();

postRoutes.post("/posts", UserService.checkToken, PostController.postCreate);
postRoutes.get("/posts", PostController.postList);
postRoutes.get("/posts/:id", PostController.getPostById);
postRoutes.put("/posts/:id", UserService.checkToken, PostController.postUpdate);
postRoutes.delete("/posts/:id", UserService.checkToken, PostController.postDelete);

export default postRoutes;