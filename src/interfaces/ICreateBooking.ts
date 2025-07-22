import { BookingStatus } from "../../enums";

export interface ICreateBooking {
    id: string,
    start_date: string;
    end_date: string,
    status: BookingStatus,
    user_id: string,
    room_id: string,
    user_role: number
}