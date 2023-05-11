import { UserGender, UserType } from "../entities/user.entity";

export class CreateUserDto {
    user_id: number;
    name: string;
    gender: UserGender;
    session_key: string;
    openid: string;
    nickname: string;
    avatar: string;
    tel: string;
    user_type: UserType;
    state: number;
    del_flag: boolean;
    create_time: Date;
    update_time: Date;
    delete_time: Date;
}
