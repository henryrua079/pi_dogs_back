const { INTEGER } = require("sequelize");
const { Dog, Temperament, User } = require("../db");
const axios = require("axios");
require('dotenv').config();

const { URL_BASE, API_KEY } = process.env

const filterDogs = (dogs) =>
    dogs.map((dog => {
        return {
            id: dog.id,
            name: dog.name,
            height: dog.height.metric,//.split('-').map(el=>parseInt(el)).reduce((prev,curr)=>curr+=prev)/(dog.height.metric.split('-').length),
            weight: dog.weight.metric,
            life_span: dog.life_span,
            image: dog.image.url,
            created: false,
            createdBy: false,
            Temperaments: dog.temperament?.split(',')
                .map(tem => tem.trim())
        }
    }))


    const filterDogsDB = (dogs) =>{
    return    dogs.map(dog => {
       return{
           id:dog.id,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            life_span: dog.life_span,
            image: dog.image,
            created: dog.created,
            createdBy:dog.User?.username,
            Temperaments: dog.Temperaments.map(temp => temp.name)
        }
    }
        )}
    

const getAllDogs = async () => {
    const allDogs_DDB = await Dog.findAll({
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
    });

    
    const allDogs_DDB_fil = filterDogsDB(allDogs_DDB); 
    const allDogs_API = (await axios.get(`${URL_BASE}`)).data;
    const allDogs_API_Fil = filterDogs(allDogs_API); 

    return [...allDogs_DDB_fil,...allDogs_API_Fil];
    
};

module.exports = { filterDogs, getAllDogs, filterDogsDB }
