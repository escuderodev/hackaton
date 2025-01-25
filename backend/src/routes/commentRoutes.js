import express from 'express';
import { CommentController } from '../controllers/commentController.js';
import { UserService } from '../services/userService.js';

const commentRoutes = express.Router();

commentRoutes.post("/comments", UserService.checkToken, CommentController.commentCreate);
commentRoutes.get("/comments", CommentController.commentList);
commentRoutes.delete("/comments/:id", UserService.checkToken, CommentController.commentDelete);

export default commentRoutes;