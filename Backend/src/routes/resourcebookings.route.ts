import { ResourceBookingController } from "../controllers/resourceBookings.controller";
import router from 'express';
import { verifyTokens } from "../middleware/verifyTokens";

const resourceBookingController = new ResourceBookingController();

export const resourceBookingRouter = router();

resourceBookingRouter.post('/create/:ResourceId',verifyTokens, resourceBookingController.createResourceBook);
resourceBookingRouter.put('/update/:BookId', resourceBookingController.updateResourceBook);
resourceBookingRouter.put('/cancel/:bookId', resourceBookingController.cancelResourceBook);
resourceBookingRouter.put('/approve/:bookId', resourceBookingController.approveBooking);
resourceBookingRouter.put('/return', resourceBookingController.returnResourceBook);
resourceBookingRouter.get('/fetchAll', resourceBookingController.getAllResourceBookings);
resourceBookingRouter.get('/fetchOne/:bookId', resourceBookingController.getOneBook);
resourceBookingRouter.get('/fetchByUser/',verifyTokens, resourceBookingController.getResourceBookingsByUserId);
resourceBookingRouter.get('/getStatistics/:resourceId', resourceBookingController.getBookStatistics);