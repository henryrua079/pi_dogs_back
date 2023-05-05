const { Dog, Temperament, User } = require('../db');
const axios = require("axios");
require('dotenv').config();


const { URL_BASE, API_KEY, URL_IMAGE } = process.env

const filterDog = (dog) => {
    return {
        id: dog.id,
        name: dog.name,
        height: dog.height?.metric,
        weight: dog.weight?.metric,
        life_span: dog.life_span,
        image: `${URL_IMAGE}/${dog.reference_image_id}.jpg`,
        created: false,
        createdBy: true,
        Temperaments: dog.temperament?.split(',')
            .map(tem => tem.trim())
    }
}


const filterDogDB = (dog) => {
    return {
        id: dog.id,
        name: dog.name,
        height: dog.height,
        weight: dog.weight,
        life_span: dog.life_span,
        image: dog.image,
        created: dog.created,
        createdBy: dog.User?.username,
        Temperaments: dog.Temperaments?.map(tem => tem.name)
    }
}


const getDogById = async (id, source) => {
    const dog =
        source === 'DB'
            ? filterDogDB(await Dog.findByPk(id, {
                // ? (await Dog.findByPk(id, {
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
            }))
            //: ((await axios.get(`${URL_BASE}/${id}`)).data)
            : filterDog((await axios.get(`${URL_BASE}/${id}`)).data)

    if (!dog.name) {
        throw new Error('No breed found')
    } else {
        return dog
    }
}

module.exports = getDogById;



