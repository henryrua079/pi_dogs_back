require('dotenv').config();
const {Temperament} = require('./src/db.js');
const { conn } = require('./src/db.js');
const axios = require("axios");
const {URL_BASE} = process.env;
const server = require('./src/app.js');
const  getAllTemperaments = require('./src/Controllers/getAllTemperaments.js') 

// Syncing all the models at once.
conn.sync({ alter: true }).then(() => {
  server.listen(3001, async () => {
    console.log('listening at 3001'); // eslint-disable-line no-console
  
    const temperamets = await getAllTemperaments()

    if (temperamets) return;

    const dogs = await axios(`${URL_BASE}`)
      .then(response => response.data)

    const temps = dogs.map(dog => dog.temperament)
      .filter(temp => temp != null)
      .map(tem => tem.split(','))
      .flat()
      .map(tem => tem.trim())

    const temps_fil = [...new Set(temps)]
      .sort()
      .map(tem => {
        // return  [tem]
        return { name: tem }
      })

    return await Temperament.bulkCreate(temps_fil);


  });

});

