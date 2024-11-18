import { ProductEntity } from "./product-entity"
import { UserEntity } from "./user-entity"

export interface CartEntity {
    id: number
    createdAt: string | number
    totalAmount: number
    cartItem: CartItemEntity[]
    status: CartStatus
    user: UserEntity
}

export interface CartItemEntity {
    id: number
    cartId: number
    productId: number
    quantity: number
    product: ProductEntity
}

export enum CartStatus {
    ACTIVE = "ACTIVE",
    COMPLETED = "COMPLETED",
}