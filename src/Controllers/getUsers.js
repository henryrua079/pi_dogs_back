const { Dog, User } = require('../db');
const {Op, and} =require("sequelize")


const filterUsers = (user) =>{
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            dogs: user.Dogs?.map((dog) => dog.name),
        }
      }
  

// const getUsers = async () => {

//     const users = await User.findAll({
//         include: {
//             model: Dog,
//             attributes: ["name"],
//             through: {
//                 attributes: []
//             }
//         }
//     });

//     if (users.length === 0) {
//        throw new Error('Users no found');
//     } else {
//         return filterUsers(users)
//     }
// }



const getUsers = async (username, password) => {

    const user = await User.findOne({
        where: {
            [Op.and]: [
              { username: username },
              { password: password }
            ]
          },
        include: {
          model: Dog,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      });
    
    if (!user) {
       throw new Error('User no register');
    } else {
        return filterUsers(user)
    }
}



module.exports = getUsers;



