import { CategoryController } from "../controllers/category.controller";
import router from 'express';


const categoryController = new CategoryController();

export const categoryRouter = router();

categoryRouter.post('/create', categoryController.createCategory);
categoryRouter.get('/fetchAll', categoryController.fetchCategories);
categoryRouter.get('/fetchOne/:categoryId', categoryController.fetchCategory);
categoryRouter.delete('/delete/:categoryId', categoryController.deleteCategory);