import UserModel from "../models/user.dal";

class UserService {
    private userModel: UserModel;

    constructor(userModel: UserModel) {
        this.userModel = userModel;
    }

    async getUserById(id: string) {
        const user = await this.userModel.getById(id);
        if (!user) {
            throw new Error("Пользователь не найден");
        }
        return user.role;
    }
}

export default UserService;
