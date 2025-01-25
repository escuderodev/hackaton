import { PostService } from "../services/postService.js";

export class PostController {

    static async postList(req, res) {
        const result = await PostService.postList();

        if (Array.isArray(result)) {
            res.status(200).json(result);
        } else {
            res.status(500).json({ message: result })
        }
    };

    static async getPostById(req, res) {
        try {
            const id = req.params.id;
            const postSearch = await PostService.getPostById(id);

            if (postSearch) {
                res.status(200).json(postSearch);
            } else {
                res.status(404).json({ message: "Post não encontrado!" });
            }
        } catch (error) {
            res.status(500).json({ message: `Falha ao buscar Post por id - ${error.message}` });
        }
    };

    static async postCreate(req, res) {
        const newPost = await PostService.postCreate(req);

        if(typeof newPost === 'string') {
            res.status(500).json({message: `Falha ao cadastrar Post!`});
        } else {
            res.status(201).json(newPost);
        }
    };

    static async postUpdate(req, res) {
        const result = await PostService.postUpdate(req);

        if (typeof result === 'string') {
            res.status(200).json({
                message: result
            });
        } else {
            res.status(500).json(result);
        }
    };

    static async postDelete(req, res) {
        const id = req.params.id;
        const result = await PostService.postDelete(id);

        if (typeof result === 'string') {
            res.status(200).json({
                message: result
            });
        } else {
            res.status(500).json(result);
        }
    };

    static async getPostBykeyword(req, res) {
        const { keyword } = req.params

        if(!keyword || typeof keyword !== 'string') {
            return res.status(400).json({erro: "A keyword is required for searching!"})
        }

        try {
            const posts = await PostService.getPostBykeyword(keyword)
            return res.status(200).json({posts})
          } catch (err) {
            console.error(err);
            return res.status(500).json({error: 'An error occurred while searching for posts'});
        }
    };
};