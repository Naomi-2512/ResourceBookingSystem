import { ChatsController } from "../controllers/chat.controller";
import router from 'express';

const chatsController = new ChatsController();

export const chatsRouter = router();

chatsRouter.post('/create', chatsController.createChat);
chatsRouter.put('/update/:chatId', chatsController.updateChat);
chatsRouter.get('/fetchAll', chatsController.getAllChats);
chatsRouter.delete('/delete/:chatId', chatsController.deleteChat);