import { GenderEnum } from "../../../entities/gender-entity";
import { ProfileImageEntity } from "../../../entities/profile-entity";

export interface UpdateProfileDTO {
    username: string
    address: string
    gender: GenderEnum
    phone: number
    image?: FileList;
}