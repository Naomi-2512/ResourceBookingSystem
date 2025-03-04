import router from 'express';
import { VenueController } from "../controllers/venue.controller";


const venueController = new VenueController();

export const venueRouter = router();

venueRouter.post('/create', venueController.createVenue);
venueRouter.put('/update/:venueId', venueController.updateVenue);
venueRouter.get('/fetchAll', venueController.fetchVenues);
venueRouter.get('/fetchOne/:venueId', venueController.fetchOneVenue);
venueRouter.delete('/delete/:venueId', venueController.deleteVenue);