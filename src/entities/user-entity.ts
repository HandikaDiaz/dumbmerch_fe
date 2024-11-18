import { ProfileEntity } from "./profile-entity";
import { RoleEnum } from "./role-entity";

export interface UserEntity {
    id: number;
    email?: string;
    password: string;
    role: RoleEnum;
    profile: ProfileEntity;
}
