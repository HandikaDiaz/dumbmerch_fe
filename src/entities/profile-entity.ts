import { GenderEnum } from "./gender-entity";
import { UserEntity } from "./user-entity";

export interface ProfileEntity {
    id?: number;
    username?: string;
    address: string;
    gender: GenderEnum;
    phone: number;
    image?: ProfileImageEntity;
    user?: Pick<UserEntity, "email">;
}

export interface ProfileImageEntity {
    url: string;
}