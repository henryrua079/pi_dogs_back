const { Router } = require('express')

const {
    getDogsHandler,
    getDogByNameHandler,
    getDogByIdHandler,
    getDogByUserIdHandler,
    createDogHandler,
    deleteDogByIdHandler
} = require("../handlers/dogsHandlers")

const dogsRouter = Router();

const validate = (req, res, next) => {
    const { name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, image, temperaments } = req.body;
    if (!name) return res.status(400).json({ error: 'Missing name' });
    if (!height_min) return res.status(400).json({ error: 'Missing height minimun' });
    if (!height_max) return res.status(400).json({ error: 'Missing height maxima' });
    if (!weight_min) return res.status(400).json({ error: 'Missing weight min' });
    if (!weight_max) return res.status(400).json({ error: 'Missing weight max' });
    if (!life_span_min) return res.status(400).json({ error: 'Missing life_span min' });
    if (!life_span_max) return res.status(400).json({ error: 'Missing life_span max' });

    // if (!image) return res.status(400).json({ error: 'Missing image' });
    if (!temperaments || !temperaments.length) return res.status(400).json({ error: 'Missing temperaments' });
    next();
};

dogsRouter.get("/", getDogsHandler)

dogsRouter.get("/name", getDogByNameHandler )

dogsRouter.get("/userid", getDogByUserIdHandler )

dogsRouter.get("/:id", getDogByIdHandler )

dogsRouter.post("/", validate , createDogHandler)

dogsRouter.delete("/:id/", deleteDogByIdHandler)

module.exports = dogsRouter;