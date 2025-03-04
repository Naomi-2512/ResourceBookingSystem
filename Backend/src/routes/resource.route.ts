import { ResourceController } from "../controllers/resource.controller";
import router from 'express';


const resourceController = new ResourceController();

export const resourceRouter = router();

resourceRouter.post('/create', resourceController.createResource);
resourceRouter.put('/update/:resourceId', resourceController.updateResource);
resourceRouter.get('/fetchAll', resourceController.fetchAllResources);
resourceRouter.get('/fetchOne/:resourceId', resourceController.fetchOneResource);
resourceRouter.get('/fetchByCategory/:categoryId', resourceController.fetchResourceByCategoryId);
resourceRouter.get('/getAvailable', resourceController.getAvailableResources);
resourceRouter.delete('/delete/:resourceId', resourceController.deleteResource);
