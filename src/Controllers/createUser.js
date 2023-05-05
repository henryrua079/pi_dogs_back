const { User } = require("../db");
const getUsers = require("./getUsers")
const  { Op, or } = require( "sequelize");

function userExists(users, user) {
    return users.some(u => u.username === user.username || u.email === user.email);
  }


const createUser = async (user) => {
    const { username, email, password } = user

    const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { username },
            { email }
          ]
        }
      });
    
      if (existingUser) {
        throw new Error('Username or email already exists');
      }
    
      // Crear el nuevo usuario
      const newUser = await User.create({
        username,
        email,
        password
      });

return newUser;


}

module.exports = createUser;