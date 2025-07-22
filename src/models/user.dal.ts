import db from "../db";
import { ApiError } from "../exceptions/api_errors";


class UserModel {
    async getAll() {
        try {
            const query = db('users');
            return await query.where('role', 2)
        } catch (err) {
            console.error('Error fetching all users', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            
            ApiError.BadConnectToDB(errorArray)
        }
    }

    async getById(id: string) {
        try {
            const query = db('users');
            return await query.where('id', id).first();
        } catch (err) {
            console.error('Error fetching user by ID', err);
            const errorArray: string[] = [err instanceof Error ? err.message : String(err)];
            
            ApiError.BadConnectToDB(errorArray)
        }
    }
}

export default UserModel;