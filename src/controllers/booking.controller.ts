import {validationResult} from "express-validator";
import { Request, Response, NextFunction } from "express";
import { ApiError } from "../exceptions/api_errors";
import BookingService from "../services/booking.service";

class BookingController {
    private bookingService: BookingService;

    constructor(bookingService: BookingService) {
        this.bookingService = bookingService;
    }

    createBooking = async(req: any, res: Response, next: NextFunction) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg);
                return next(
                    ApiError.BadRequest('Ошибка при валидации', errorMessages),
                );
            }
            
            const newBooking = await this.bookingService.createBooking(
                req.body.user_id,
                req.body.room_id,
                req.body,
                req.userRole
            );

            res.status(201).json(newBooking);
        } catch(e) {
            next(e);
        }
    }

    deleteBooking = async (req: any, res: Response, next: NextFunction) => {
         try {
            const booking_id = req.params.booking;

            await this.bookingService.deleteBooking(booking_id);

            res.status(200).json('Бронирование успешно отменено');
        } catch (e) {
            next(e);
        }
    }
}

export default BookingController;