import db from "../db";
import { ApiError } from "../exceptions/api_errors";
import { ICreateBooking } from "../interfaces/ICreateBooking";


class BookingModel {
    async create(bookingData: ICreateBooking) {
        try {
            const query = db('bookings');
            /* await query.insert(bookingData); */

            const [newBooking] = await query.insert(bookingData).returning('*');
            return newBooking;
        } catch (err) {
            console.error('Error creating booking', err);
            throw err;
        }
    }

    async getAll() {
        try {
            const query = db('bookings');
            return await query.select("*")
        } catch (err) {
            console.error('Error fetching all bookings', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            
            ApiError.BadConnectToDB(errorArray)
        }
    }

    async delete(booking_id: string) {
        try {
            const query = db('bookings');
            await query.where('id', booking_id).delete();
        } catch (err) {
            console.error('Error deleting booking', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];

            ApiError.BadConnectToDB(errorArray);
        }
    }
}

export default BookingModel;