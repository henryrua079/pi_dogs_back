const { Temperament } = require('../db');
require('dotenv').config();

const { URL_BASE } = process.env

const getAllTemperaments = async () => {

    const temperamentos = await Temperament.findAll();
    return temperamentos;


   

}

module.exports = getAllTemperaments;