import router from 'express';
import { VenueBookingController } from '../controllers/venueBookings.controller';
import { verifyTokens } from '../middleware/verifyTokens';

const venueBookingController = new VenueBookingController();

export const venueBookingRouter = router();

venueBookingRouter.post('/create/:venueId', venueBookingController.createVenueBookings);
venueBookingRouter.put('/update/:BookId', venueBookingController.updateVenueBook);
venueBookingRouter.put('/cancel/:bookId', venueBookingController.cancelBooking);
venueBookingRouter.put('/approve/:bookId', venueBookingController.approveBooking);
venueBookingRouter.get('/fetchAllByDate', venueBookingController.getVenueBookingsByDate);
venueBookingRouter.get('/fetchByVenueId/:venueId', venueBookingController.getVenueBookingsByVenueId);
venueBookingRouter.get('/fetchByUser/',verifyTokens, venueBookingController.getVenueBookingsByUserId);