const { Dog } = require('../db');


const deleteDogById = (id) => {
    Dog.destroy({ where: { id: id } })
        .then((res) => {
            return res
        })
        .catch(error => error.message)
}

module.exports = deleteDogById;