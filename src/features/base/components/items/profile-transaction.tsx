import { Box, Stack, Typography } from "@mui/material"
import logo from '../../../../assets/logo.svg'
import { useCart } from "../../hooks/cart"
import { format } from 'date-fns';

function ProfileTransaction() {
    const { data } = useCart();
    return (
        <>
            {data?.map((cart) => (
                cart.cartItem.map((item) => {
                    const formattedDate = format(new Date(cart.createdAt), "EEEE, dd MMMM yyyy");
                    return (
                        <Stack direction={'row'} gap={3} sx={{ backgroundColor: 'background.paper', borderRadius: '5px', p: 2, mb: 2 }}>
                            <img
                                src="https://i.pinimg.com/enabled_hi/564x/39/f0/bb/39f0bb0664cdf534463580ecd4c6a0d9.jpg"
                                alt="item" height={150} style={{ objectFit: 'contain', borderRadius: '5px 0 0 5px' }}
                            />
                            <Stack direction={'column'} justifyContent={'space-between'} sx={{ backgroundColor: 'background.paper' }}>
                                <Box sx={{ backgroundColor: 'background.paper' }}>
                                    <Typography sx={{ color: 'secondary.main', fontWeight: 'bold' }}>
                                        {item.product.productName}
                                    </Typography>
                                        <Typography variant="caption" sx={{ fontSize: '15px', color: 'text.secondary' }}>
                                        {formattedDate} 
                                        </Typography>
                                    <Typography sx={{ color: 'text.primary' }}>Price : Rp.{item.product.price}</Typography>
                                </Box>
                                <Box sx={{ backgroundColor: 'background.paper' }}>
                                    <Typography sx={{ color: 'primary.main', fontWeight: 'bold' }}>Sub Total : Rp.500.000</Typography>
                                </Box>
                            </Stack>
                            <img src={logo} alt="logo" width={50} style={{ objectFit: 'contain', backgroundColor: 'transparent' }} />
                        </Stack>
                    )
                })
            ))}
        </>
    )
}

export default ProfileTransaction