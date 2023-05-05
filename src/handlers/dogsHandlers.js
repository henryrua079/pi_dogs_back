const {getAllDogs} = require("../Controllers/getAllDogs");
const createDog = require("../Controllers/createDogs")
const getDogById = require("../Controllers/getDogById")
const getDogByName = require("../Controllers/getDogByName")
const getDogByUserId = require("../Controllers/getDogByUserId")
const deleteDogById = require("../Controllers/deleteDogById")


const getDogsHandler = async (req, res) => {
    try {
        const alldogs = await getAllDogs();
        res.status(200).json(alldogs)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getDogByNameHandler = async (req, res) => {
    const { name } = req.query;
    try {
    if(!name) throw Error('Name is require')
        const alldogs = await getDogByName(name);
        if (!alldogs.length) throw Error('No breeds found')
        return res.status(200).json(alldogs);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getDogByIdHandler = async (req, res) => {
    const { id } = req.params;
    const source = isNaN(id) ? 'DB' : 'API'
    try {
        const dog = await getDogById(id, source);
        res.status(200).json(dog)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const getDogByUserIdHandler = async (req, res) =>{
    const { userid } = req.query;
    try {
        const dogsByUserId = await getDogByUserId(userid);
        if (!dogsByUserId.length) throw Error('No breeds found')
        res.status(200).json(dogsByUserId);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }



}


const deleteDogByIdHandler = async (req, res) => {
    const { id } = req.params;
    try {
        const dog = deleteDogById(id);
        res.status(204).json({ message: `dog with id: ${id} deleted` })
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}



const createDogHandler = async (req, res) => {
    const { name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, image, temperaments, UserId } = req.body;
    try {
        const newDog = await createDog(name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, image, temperaments, UserId);
        res.status(201).json(newDog);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}








module.exports = {
    getDogsHandler,
    getDogByNameHandler,
    getDogByIdHandler,
    getDogByUserIdHandler,
    createDogHandler,
    deleteDogByIdHandler
}
