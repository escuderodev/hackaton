import express from "express";
import disciplineRoutes from "./disciplineRoutes.js";
import userRoutes from "./userRoutes.js";
import commentRoutes from "./commentRoutes.js";
import postRoutes from "./postRoutes.js";

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).json({message: "Bem vindo ao nosso Projeto da Postech Dev FullStack!"}));

    app.use(express.json(), disciplineRoutes);
    app.use(express.json(), userRoutes);
    app.use(express.json(), commentRoutes);
    app.use(express.json(), postRoutes);
};

export default routes;