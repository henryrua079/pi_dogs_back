const { Dog, Temperament, User } = require("../db");
const { Op } = require("sequelize")
const axios = require("axios");
const { filterDogsDB } = require('./getAllDogs')
require('dotenv').config();

const { URL_BASE, API_KEY, URL_IMAGE } = process.env

const getDogByUserId = async (query) => {
   
    const dogsByUserId = filterDogsDB(await Dog.findAll({
       where: {
              UserId: query
            },
        include: [
            {
                model: Temperament,
                attributes: ["name"],
                through: {
                    attributes: [],
                }
            },
        ]
    }));


      return  dogsByUserId;
    
};

module.exports = getDogByUserId;