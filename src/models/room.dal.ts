import db from "../db";
import { ApiError } from "../exceptions/api_errors";


class RoomModel {
    async getAll() {
        try {
            const query = db('rooms');
            return await query.select("*")
        } catch (err) {
            console.error('Error fetching all rooms', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            
            ApiError.BadConnectToDB(errorArray)
        }
    }
}

export default RoomModel;