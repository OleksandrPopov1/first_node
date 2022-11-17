const {Router} = require('express');

const userController = require("../controllers/user.controller");
const userMdlwr = require("../middlewares/user.middleware");

const userRouter = Router();

userRouter.get('/', userController.getUsers);
userRouter.post('/', userMdlwr.checkIsUserBodyValid, userController.createUser)

userRouter.get('/:userId', userController.getUserById);
userRouter.delete('/:userId', userController.deleteUserById);
userRouter.put('/:userId', userController.updateUserById);

module.exports = userRouter;
