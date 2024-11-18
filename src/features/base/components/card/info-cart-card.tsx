import { Stack, Typography } from "@mui/material"
import { useCart } from "../../hooks/cart";

function InfoCart() {
    const { data, isLoading } = useCart();
    const totalQuantity = data?.reduce((sum, cart) =>
        sum + cart.cartItem.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    ) ?? 0;

    const totalAmount = data?.reduce((sum, cart) => sum + cart.totalAmount, 0) ?? 0;
    return (
        <Stack gap={2} mb={5} px={1} mt={4}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: 'primary.main' }}>Total items : </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: 'primary.main' }}>
                    {isLoading ? '-' : totalQuantity}
                </Typography>
            </Stack>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: 'primary.main' }}>Cart total : </Typography>
                <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: 'primary.main' }}>
                    {isLoading ? '-' : `Rp. ${totalAmount.toLocaleString('id-ID')}`}
                </Typography>
            </Stack>
        </Stack>
    )
}

export default InfoCart