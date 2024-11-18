import { CartEntity, CartItemEntity } from "./cart-entity"
import { CategoryEntity } from "./category-entity"

export interface ProductEntity {
    id: number
    productName: string
    productDesc: string
    price: number
    Qty: number
    image: ProfileProductEntity
    category?: CategoryEntity
    Cart?: CartEntity[]
    CartItem?: CartItemEntity[]
}

export interface ProductEntityV2 {
    id: number
    productName: string
    productDesc: string
    price: number
    Qty: number
    image: ProfileProductEntity[]
    category?: CategoryEntity
    Cart?: CartEntity[]
    CartItem?: CartItemEntity[]
}

export interface ProfileProductEntity {
    id: number;
    url: string;
}