import express from "express";
import RoomController from "../controllers/room.controller";


export default (roomController: RoomController) => {
    const router = express.Router();

    router.get('/rooms', roomController.getAllRooms);

    return router;
}