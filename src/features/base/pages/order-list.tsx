import { Box, Stack, Typography } from "@mui/material"
import OrderListProduct from "../components/items/order-list"

function OrderList() {
    return (
        <Box width={'90%'} sx={{ margin: 'auto', mt: 3 }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>Order List</Typography>
            </Stack>
            <Box sx={{ overflowY: 'auto', height: '70vh' }}>
                <OrderListProduct />
            </Box>
        </Box>
    )
}

export default OrderList