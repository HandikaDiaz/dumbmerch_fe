import { ProfileEntity } from "../../../entities/profile-entity";
import { UserEntity } from "../../../entities/user-entity";

interface UserLoginFields extends Pick<UserEntity, "email" | "password"> {}
interface ProfileLoginFields extends Pick<ProfileEntity, "username"> {}

export interface LoginRequestDTO extends UserLoginFields, ProfileLoginFields {}

export interface LoginResponseDTO {
    user: UserEntity;
    token: string;
};