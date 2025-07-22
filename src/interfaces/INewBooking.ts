import { BookingStatus } from "../../enums";

export interface INewBooking {
    start_date: string;
    end_date: string,
    status: BookingStatus
}