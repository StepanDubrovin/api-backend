import express from 'express'
import 'dotenv/config';
import RoomService from './services/room.service';
import RoomModel from './models/room.dal';
import BookingModel from './models/booking.dal';
import RoomController from './controllers/room.controller';
import roomRoutes from './routes/room.route';
import BookingService from './services/booking.service';
import BookingController from './controllers/booking.controller';
import bookingRoutes from './routes/booking.route';


const app = express();
const port = Number(process.env.PORT);

app.use(express.json());

const roomService = new RoomService(new RoomModel(), new BookingModel);
const roomController = new RoomController(roomService);

const bookingService = new BookingService(new BookingModel());
const bookingController = new BookingController(bookingService);

app.use('/api', roomRoutes(roomController));
app.use('/api', bookingRoutes(bookingController));


app.listen(port, () => {
    console.log(`SERVER STARTED ON PORT localhost:${port}`);
})