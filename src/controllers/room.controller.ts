import { Request, Response, NextFunction } from "express";
import RoomService from "../services/room.service";
import { ApiError } from "../exceptions/api_errors";
import { IRoomDate } from "../interfaces/IRoomDate";

class RoomController {
    private roomService: RoomService;

    constructor(roomService: RoomService) {
        this.roomService = roomService;
    }

    getAllRooms = async(req: Request, res: Response, next: NextFunction) => {
        try {
            const { start_date, end_date} = req.query as IRoomDate;

            const rooms = await this.roomService.getAllRooms(start_date, end_date);

            if (rooms) {
                res.status(200).json(rooms)
            } else {
                return next(
                    ApiError.NotFound('Номера не найдены')
                )
            }
        } catch(e) {
            next(e);
        }
    }
}

export default RoomController;