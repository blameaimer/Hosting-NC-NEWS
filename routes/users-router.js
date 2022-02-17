const userRouter = require('express').Router();
const {getUsers} = require('../controllers/user-controller')
userRouter.get('/', getUsers);

module.exports = userRouter;