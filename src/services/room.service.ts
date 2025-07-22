import { IRoomDate } from "../interfaces/IRoomDate";
import BookingModel from "../models/booking.dal";
import RoomModel from "../models/room.dal";


class RoomService {
    private roomModel: RoomModel;
    private bookingModel: BookingModel;

    constructor(roomModel: RoomModel, bookingModel: BookingModel) {
        this.roomModel = roomModel;
        this.bookingModel = bookingModel;
    }

    async getAllRooms(start_date?: string, end_date?: string) {
        const allRooms = await this.roomModel.getAll();
        
        if (!start_date || !end_date) {
            return allRooms;
        }
        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        const allBookings = await this.bookingModel.getAll();

        const busyRooms = new Set(
            allBookings
                ?.filter(booking => {
                    const bookingStart = new Date(booking.start_date);
                    const bookingEnd = new Date(booking.end_date);

                    return bookingEnd > startDate && bookingStart < endDate;
                }
                    
            )
            .map(booking => booking.room_id)
        );

        const freeRooms = allRooms?.filter(room => !busyRooms.has(room.id));

        return freeRooms;
    }
}

export default RoomService;