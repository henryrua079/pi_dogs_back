const { Dog, User } = require("../db");


    
    const createDog = async (name, height_min, height_max, weight_min, weight_max, life_span_min, life_span_max, image, temperaments, UserId) => {
        const height = height_min.concat('-', height_max);
        const weight = weight_min.concat('-', weight_max)
        const life_span = life_span_min.concat('-', life_span_max)
        
        const user = await User.findByPk(UserId);
    
        const newDog = await user.createDog({ name, height, weight, life_span, image, UserId });
       
       
        // const newDog = await Dog.create({ name, height, weight, life_span, image });
    newDog.addTemperaments(temperaments)
       
    return newDog;
}

module.exports = createDog;