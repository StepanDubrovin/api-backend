import { v7 as uuidv7 }from 'uuid';
import BookingModel from "../models/booking.dal";
import { INewBooking } from '../interfaces/INewBooking';


class BookingService {
    private bookingModel: BookingModel;

    constructor(bookingModel: BookingModel) {
        this.bookingModel = bookingModel;
    }

    async createBooking(userId: string, roomId: string, bookingData: INewBooking, userRole: number) {
        const { start_date, end_date } = bookingData;

        const startDate = new Date(start_date);
        const endDate = new Date(end_date);

        const allBookings = await this.bookingModel.getAll();

        const busy = allBookings?.find(booking => {
            if (booking.room_id !== roomId) return false;

            const bookingStart = new Date(booking.start_date);
            const bookingEnd = new Date(booking.end_date);

            return bookingStart < endDate && bookingEnd > startDate;
        });

        if (busy) {
            throw new Error(`Этот номер уже забронирован на указанный период ${bookingData.start_date} - ${bookingData.end_date}`);
        }
        
        return await this.bookingModel.create({
            id: uuidv7(),
            user_id: userId, 
            room_id: roomId,
            ...bookingData,
            user_role: userRole,
        });
    }

    async deleteBooking(booking_id: string) {
        return await this.bookingModel.delete(booking_id);
    }
}

export default BookingService;