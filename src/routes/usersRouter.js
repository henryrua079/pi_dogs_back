const {Router} = require("express");

const {getUsersHandler, createUserHandler} = require("../handlers/usersHandler")

const usersRouter = Router();


const validate = (req, res, next) => {
    const { username, email, password } = req.body;
    if (!username) return res.status(400).json({ error: 'Missing username' });
    if (!email) return res.status(400).json({ error: 'Missing email' });
    if (!password) return res.status(400).json({ error: 'Missing password' });
    next();
};


usersRouter.get("/", getUsersHandler)
usersRouter.post("/", validate, createUserHandler)

module.exports = usersRouter;