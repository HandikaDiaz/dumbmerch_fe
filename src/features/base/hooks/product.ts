import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify"; 
import { ProductEntity, ProductEntityV2 } from "../../../entities/product-entity";
import { apiV1 } from "../../../utils/api";
import { CreateProductDTO } from "../dto/product-dto";
import { CreateProductFormInput, productSchema } from "../schemas/product-schema";

export function useProduct() {
    async function getProduct() {
        const res = await apiV1.get<null, { data: ProductEntityV2[] }>('/product/get-all');
        return res.data;
    }

    const { data, isLoading } = useQuery<ProductEntityV2[], null, ProductEntityV2[]>({
        queryKey: ['product'],
        queryFn: getProduct
    });

    return {
        data,
        isLoading,
    }
}

export function useProductDetail(productName: string) {
    async function getProductDetail() {
        const res = await apiV1.get<null, { data: ProductEntity }>(`/product/get-product/${productName}`);
        return res.data;
    }

    const { data, isLoading } = useQuery<ProductEntity, null, ProductEntity>({
        queryKey: ['product', productName],
        queryFn: getProductDetail,
        enabled: !!productName,
    });

    return {
        data,
        isLoading
    }
}

export function useProductCreate(categoryId: number) {
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        setValue
    } = useForm<CreateProductFormInput>({
        resolver: zodResolver(productSchema),
    });
    const queryClient = useQueryClient();

    async function createProduct(data: CreateProductDTO) {
        const formData = new FormData();
        formData.append('productName', data.productName ?? '');
        formData.append('productDesc', data.productDesc ?? '');
        formData.append('price', String(data.price));
        formData.append('qty', String(data.qty));
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        const res = await apiV1.post<null, { data: ProductEntity }>(`/product/create/${categoryId}`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        queryClient.invalidateQueries({ queryKey: ['product'] });
        return res.data;
    }

    const { mutateAsync: createProductAsync } = useMutation<ProductEntity, Error, CreateProductDTO>({
        mutationKey: ['createProduct'],
        mutationFn: createProduct,
        onSuccess: () => {
            toast.success('Product created successfully!');
        },
        onError: (error) => {
            toast.error(`Error creating product: ${error.message}`);
        },
    });

    async function onSubmit(data: CreateProductFormInput) {        
        const productData: CreateProductDTO = {
            productName: data.productName,
            productDesc: data.productDesc,
            price: Number(data.price),
            qty: Number(data.qty),
            image: data.image
        };
        try {
            await createProductAsync(productData);
            queryClient.invalidateQueries({ queryKey: ['product'] });
        } catch (error) {
            console.log(error);
        }
    }

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        isLoading,
        setValue
    }
}

export function useProductUpdate(productId: number) {
    const {
        register,
        handleSubmit,
        formState: { errors, isLoading },
        setValue
    } = useForm<CreateProductFormInput>({
        resolver: zodResolver(productSchema),
    });
    const queryClient = useQueryClient();

    async function updateProduct(data: CreateProductDTO) {
        const formData = new FormData();
        formData.append('productName', data.productName ?? '');
        formData.append('productDesc', data.productDesc ?? '');
        formData.append('price', String(data.price));
        formData.append('qty', String(data.qty));
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        const res = await apiV1.put<null, { data: ProductEntity }>(`/product/edit/${productId}`, formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        queryClient.invalidateQueries({ queryKey: ['product'] });
        return res.data;
    }

    const { mutateAsync: updateProductAsync } = useMutation<ProductEntity, Error, CreateProductDTO>({
        mutationKey: ['updateProduct'],
        mutationFn: updateProduct,
        onSuccess: () => {
            toast.success('Product updated successfully!');
        },
        onError: (error) => {
            toast.error(`Error updating product: ${error.message}`);
        },
    });

    async function onSubmit(data: CreateProductFormInput) {
        const productData: CreateProductDTO = {
            productName: data.productName,
            productDesc: data.productDesc,
            price: Number(data.price),
            qty: Number(data.qty),
            image: data.image
        };
        try {
            await updateProductAsync(productData);
            queryClient.invalidateQueries({ queryKey: ['product'] });
        } catch (error) {
            console.log(error);
        }
    }

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        setValue,
        isLoading
    }
}

export function useProductDelete(productId: number) {
    const queryClient = useQueryClient();
    
    const handleDelete = async () => {
        try {
            const res = await apiV1.delete(`/product/delete/${productId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            queryClient.invalidateQueries({ queryKey: ['product'] });
            toast.success('Product deleted successfully!');
            return res.data;
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Error deleting product: ${error.message}`);
            } else {
                toast.error('An unexpected error occurred.');
            }
            console.log(error);
        }
    }

    return {
        handleDelete
    }
}