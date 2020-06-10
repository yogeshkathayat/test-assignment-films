import { BaseRepository } from "./base.repository";
import { UserModel } from "../models/user.model";
import { IUser } from "../interfaces/IUser";

export class UserRepository extends BaseRepository<IUser> {
    constructor() {
        super(UserModel);
    }

    async findUserByEmail(email: string): Promise<IUser> {
        return await UserModel.findOne({ email: email }).lean();
    }

}