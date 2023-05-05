const createUser = require("../Controllers/createUser");
const getUsers = require("../Controllers/getUsers")


const getUsersHandler = async (req, res)=>{
    const {username, password} = req.query
    try {
        const user = await getUsers(username, password); 
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

const createUserHandler = async (req, res) => {
    const user = req.body
    try {
        const newUser = await createUser(user);
        res.status(201).json(newUser)
    } catch (error) {
        res.status(500).json({error:error.message})
        
    }
 }


module.exports = {
    getUsersHandler,
    createUserHandler
}