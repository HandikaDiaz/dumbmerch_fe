import { apiV1 } from "../../../utils/api";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddQuantity() {
    const queryClient = useQueryClient();

    async function addQuantity({ cartId, productId }: { cartId: number; productId: number }) {
        const res = await apiV1.post(
            `/cart/add/${cartId}/${productId}`, {}, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            }
        })
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        return res.data
    }

    const { mutateAsync: addQuantityAsync } = useMutation({
        mutationKey: ['addQuantity'],
        mutationFn: addQuantity,
    })

    async function onSubmitAdd(cartId: number, productId: number) {
        try {
            await addQuantityAsync({cartId, productId});
        } catch (error) {
            console.log(error);
        }
    }

    return {
        onSubmitAdd
    }
}

export function useRemoveQuantity() {
    const queryClient = useQueryClient();

    async function removeQuantity({ cartId, productId }: { cartId: number; productId: number }) {
        const res = await apiV1.post(
            `/cart/remove/${cartId}/${productId}`, {}, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
            }
        })
        queryClient.invalidateQueries({ queryKey: ['cart'] })
        return res.data
    }

    const { mutateAsync: removeCartAsync } = useMutation({
        mutationKey: ['removeCart'],
        mutationFn: removeQuantity,
    })

    async function onSubmitRemove(cartId: number, productId: number) {
        try {
            await removeCartAsync({cartId, productId});
        } catch (error) {
            console.log(error);
        }
    }

    return {
        onSubmitRemove
    }
}