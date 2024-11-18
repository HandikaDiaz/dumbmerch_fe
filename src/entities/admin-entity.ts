import { CategoryEntity } from "./category-entity";
import { ProductEntity } from "./product-entity";
import { ProfileEntity } from "./profile-entity";
import { RoleEnum } from "./role-entity";

export interface AdminEntity {
    id: number;
    email?: string;
    password: string;
    role: RoleEnum;
    profile: ProfileEntity;
    category: CategoryEntity;
    product: ProductEntity;
}