import { ISupport } from "./support.interface";
import { IUser } from "./user.interface";

export interface IResponseSingleUser {
    data: IUser
    support: ISupport
}