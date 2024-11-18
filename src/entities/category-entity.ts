import { ProductEntity } from "./product-entity"

export interface CategoryEntity {
    id: number
    categoryName: string
    product?: ProductEntity[]
}