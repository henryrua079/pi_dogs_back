const { Router } = require('express');
// Importar todos los routers;
const dogsRouter = require('./dogsRouter');
const temperamentsRouter = require('./temperamentsRouter')
const userRouter =require('./usersRouter')

const router = Router();



// Configurar los routers
router.use("/dogs", dogsRouter);
router.use("/temperaments", temperamentsRouter);
router.use("/users", userRouter)

module.exports = router;
