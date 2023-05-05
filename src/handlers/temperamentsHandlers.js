const getAllTemperaments = require ("../Controllers/getAllTemperaments");

const getTemperamentsHandler = async (req, res) => {
    try {
        const temps = await getAllTemperaments();
        res.status(200).json(temps)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
 }

 module.exports = getTemperamentsHandler