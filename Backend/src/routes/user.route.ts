import { UserController } from "../controllers/user.controller";
import router from 'express';
import { verifyTokens } from "../middleware/verifyTokens";

const userController = new UserController();

export const userRouter = router();

userRouter.post('/register', userController.createUser);
userRouter.put('/update',verifyTokens, userController.updateUser);
userRouter.put('/delete/:userId', userController.deleteUser);
userRouter.get('/fetchOne/:userId', userController.fetchUser);
userRouter.get('/fetchAll', userController.fetchUsers);
userRouter.get('/fetchAllDeleted', userController.fetchDeletedUsers);
userRouter.put('/restoreDeleted/:userId', userController.restoreDeletedUser);
