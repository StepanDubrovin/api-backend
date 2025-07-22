import express from "express";
import { body,  ValidationChain } from "express-validator";
import { BookingStatus } from "../../enums";
import BookingController from "../controllers/booking.controller";
import { attachRole } from "../middleware/booking.middleware";

const validateBooking: ValidationChain[] = [
    body('start_date')
        .notEmpty().withMessage('Дата заезда обязательна'),
    
    body('end_date')
        .notEmpty().withMessage('Дата выезда обязательна'),

    body('status')
        .notEmpty().withMessage('Статус обязателен')
        .isIn([
            BookingStatus.ACTIVE,
            BookingStatus.CANCELLED,
        ]).withMessage('Неверный статус объявления')
];


export default (bookingController: BookingController) => {
    const router = express.Router();

    router.post('/booking', validateBooking, attachRole, bookingController.createBooking);
    router.delete('/booking/:booking_id', bookingController.deleteBooking);

    return router;
}