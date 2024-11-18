export interface CreateProductDTO {
    productName: string;
    productDesc: string;
    price: number;
    qty: number;
    image?: FileList;
}

export interface RequestProductDto {
    id: number;
    productName: string;
    productDesc: string;
    price: number;
    qty: number;
    image: IProductImage;
}

export interface ResponseProductDto extends RequestProductDto {}

export interface IProductImage {
    id: number;
    url: string;
    productId: number;
}