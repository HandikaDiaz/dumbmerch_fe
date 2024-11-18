import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { apiV1 } from "../../../utils/api";
import { CartEntity, CartItemEntity } from "../../../entities/cart-entity";
import { toast } from 'react-toastify';

export function useAllCart() {
    async function getAllCart() {
        const res = await apiV1.get<null, { data: CartEntity[] }>(`/cart/get-all`);
        return res.data;
    }

    const { data, isLoading } = useQuery<CartEntity[], null, CartEntity[]>({
        queryKey: ['all-cart'],
        queryFn: getAllCart
    });

    return {
        data,
        isLoading
    };
}

export function useCartByCartId(cartId: number) {
    async function getCartByCartId() {
        const res = await apiV1.get<null, { data: CartItemEntity[] }>(`/cart/get-info/${cartId}`);
        return res.data;
    }

    const { data, isLoading } = useQuery<CartItemEntity[], null, CartItemEntity[]>({
        queryKey: ['cart-by-cart-id'],
        queryFn: getCartByCartId
    });

    return {
        data,
        isLoading
    };
}

export function useCart() {
    async function getCart() {
        const res = await apiV1.get<null, { data: CartEntity[] }>(`/cart/get`, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            }
        });
        return res.data;
    }

    const { data, isLoading } = useQuery<CartEntity[], null, CartEntity[]>({
        queryKey: ['cart'],
        queryFn: getCart
    });

    return {
        data,
        isLoading
    };
}

export function useAddCart(productId: number) {
    const queryClient = useQueryClient();

    async function addProductToCart() {
        const res = await apiV1.post(
            `/cart/create/${productId}`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                }
            }
        );
        queryClient.invalidateQueries({ queryKey: ['cart'] });
        return res.data;
    }

    const { mutateAsync: addProductToCartAsync } = useMutation({
        mutationKey: ['createProductToCart'],
        mutationFn: addProductToCart,
    });

    async function onSubmit() {
        try {
            await addProductToCartAsync();
            toast.success('Product added to cart!');
            queryClient.invalidateQueries({ queryKey: ['cart'] });
        } catch (error) {
            console.log(error);
            toast.error('Failed to add product to cart.');
        }
    }

    return {
        onSubmit
    };
}

export function useDeleteCart() {
    const queryClient = useQueryClient();
    const handleDelete = async (cartId: number) => {
        try {
            const res = await apiV1.delete(`/cart/delete/${cartId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`,
                }
            })
            queryClient.invalidateQueries({ queryKey: ['cart'] });
            toast.success('Cart deleted successfully!');
            return res.data;
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete category.');
        }
    }

    return {
        handleDelete
    }
}