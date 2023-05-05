const { Dog, Temperament, User } = require("../db");
const { Op } = require("sequelize")
const axios = require("axios");
const { filterDogs, filterDogsDB } = require('./getAllDogs')
require('dotenv').config();

const { URL_BASE, API_KEY, URL_IMAGE } = process.env

const findDogByName = async (query) => {
    const name_validate = {
        name: { [Op.iLike]: `%${query?.toLowerCase()}%` }
    }
    const allDogs_DDB = filterDogsDB(await Dog.findAll({
        where: name_validate,
        include: [
            {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            },
            {
                model: User,
                attributes: ["username"],
            }
        ],
    }));

    
    let nameBreed = query?.toLowerCase()
    .split(' ')
    .map(palabra => palabra[0]?.toUpperCase() + palabra.slice(1))
    .join(' ');
    
    const dogs_api_fil = filterDogs(((await axios.get(`${URL_BASE}`)).data).filter(dog => dog.name.includes(nameBreed)));
    
    return [...allDogs_DDB, ...dogs_api_fil];
};

module.exports = findDogByName;