import { comment } from "../models/Comment.js";
import { UserService } from '../services/userService.js';
import { post } from '../models/Post.js';

export class CommentService {

    static async commentList() {
        try {
            return await comment.find({});
        } catch (error) {
            return { message: `Falha ao listar comentários - ${error.message}` };
        }
    };

    static async commentCreate(req) {
        try {
            const { description, postId } = req.body
            const authorization = req.headers.authorization

            if (authorization !== undefined) {

                const userId = await UserService.getUserIdFromToken(authorization)
                if (!userId) {
                    throw new Error('userId environment variable is not set!');
                }

                const user = await UserService.getUserById(userId)
                if (!user) {
                    throw new Error(`User ${userId} not found!`);
                }

                // validação de campos obrigatórios
                if (!description) {
                    throw new Error('description field is required!')
                }

                if (!postId) {
                    throw new Error('postId field is required!')
                }

                const existingPost = await post.findById(postId);

                if (!existingPost) {
                    throw new Error('Post não encontrado')
                }

                const newComment = {
                    description,
                    author: user.name,
                }

                const commentCreated = await comment.create(newComment);

                // Associando o comentário ao Post
                await post.findByIdAndUpdate(postId, { $push: { comments: commentCreated._id } });

                return {
                    message: "Comentário cadastrado com sucesso!",
                };
            }
        } catch (error) {
            return `Falha ao cadastrar comentário!`;
        }
    };

    static async commentDelete(id) {
        try {
            const commentSearch = await comment.findById(id);
            if (commentSearch) {
                await comment.findByIdAndDelete(id);
                return "Comentário excluído com sucesso!";
            } else {
                return "Comentário não encontrado!";
            }
        } catch (error) {
            return { message: `Falha ao excluir comentário - ${error.message}` };
        }
    };
};