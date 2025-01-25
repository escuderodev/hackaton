import { post } from "../models/Post.js";
import { UserService } from '../services/userService.js';
import { DisciplineService } from '../services/disciplineService.js';

export class PostService {

    static async postList() {
        try {
            return await post.find({}).populate('comments');
        } catch (error) {
            return { message: `Falha ao listar Posts - ${error.message}` };
        }
    };

    static async getPostById(id) {
        try {
            const postSearch = await post.findById(id).populate('comments');
            if (postSearch) {
                return postSearch;
            } else {
                return { message: "Post não encontrado!" };
            }
        } catch (error) {
            return { message: `Falha ao buscar Post por id - ${error.message}` };
        }
    };

    static async postCreate(req) {
        const { title, description, discipline } = req.body
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

            const existingDiscipline = await DisciplineService.getDisciplineById(discipline);

            if (!existingDiscipline) {
                throw new Error('Disciplina não encontrada')
            }

            try {
                const newPost = {
                    title,
                    description,
                    author: user.name,
                    discipline: existingDiscipline.title
                }
                await post.create(newPost);
                return {
                    message: "Post cadastrado com sucesso!",
                    post: newPost
                };
            } catch (error) {
                return `Falha ao cadastrar Post!`;
            }
        }
    };

    static async postUpdate(req) {

        try {
            const id = req.params.id;
            const { title, description, discipline } = req.body
            const authorization = req.headers.authorization
            const postSearch = await post.findById(id);

            if (postSearch) {
                if (authorization !== undefined) {

                    const userId = UserService.getUserIdFromToken(authorization)

                    if (!userId) {
                        throw new Error('userId environment variable is not set!');
                    }

                    const user = await UserService.getUserById(userId)

                    if (!user) {
                        throw new Error(`User ${userId} not found!`);
                    }

                    const existingDiscipline = await DisciplineService.getDisciplineById(discipline);

                    if (!existingDiscipline) {
                        throw new Error('Disciplina não encontrada')
                    }

                    const postUpdated = {
                        id: id,
                        title: title,
                        description: description,
                        author: user.name,
                        discipline: existingDiscipline.title,
                        updatedAt: Date.now()
                    }

                    await post.findByIdAndUpdate(id, postUpdated);
                    return "Post atualizado com sucesso!";
                } else {
                    return "Post não encontrado!";
                }
            }
        } catch (error) {
            return { message: `Falha ao atualizar Post - ${error.message}` };
        }
    };

    static async postDelete(id) {
        try {
            const postSearch = await post.findById(id);
            if (postSearch) {
                await post.findByIdAndDelete(id);
                return "Post excluído com sucesso!";
            } else {
                return "Post não encontrada!";
            }
        } catch (error) {
            return { message: `Falha ao excluir Post - ${error.message}` };
        }
    };

    async getPostByText(regex) {

        const posts = await post.find({
            $or: [
                { title: regex },
                { description: regex },
            ],
        }).populate('discipline');
        return posts
    };
};