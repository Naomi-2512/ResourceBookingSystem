import express, { Express, json, NextFunction, Request, Response } from "express";
import cors from 'cors';
import { userRouter } from "./routes/user.route";
import { resourceRouter } from "./routes/resource.route";
import { venueRouter } from "./routes/venue.route";
import { categoryRouter } from "./routes/category.route";
import { chatsRouter } from "./routes/chat.route";
import { resourceBookingRouter } from "./routes/resourcebookings.route";
import { venueBookingRouter } from "./routes/venuebookings.route";

const app = express();

app.use(json());
app.use(cors());

app.use('/user', userRouter);
app.use('/resource', resourceRouter);
app.use('/category', categoryRouter);
app.use('/chat', chatsRouter);
app.use('/auth', userRouter);
app.use('/resourceBook', resourceBookingRouter);
app.use('/venue', venueRouter);
app.use('/venueBook', venueBookingRouter);

app.use((err:Error, req:Request,res:Response,next:NextFunction) =>{
    res.json({
        message:err.message
    })
});

app.listen(3000, ()=>{
    console.log('server is litsening on port 3000')
})


