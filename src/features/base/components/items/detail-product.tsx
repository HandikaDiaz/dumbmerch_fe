import { Box, Button, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useProductDetail } from "../../hooks/product";

function DetailProduct() {
    const { productName } = useParams<{ productName: string }>();    
    const { data, isLoading } = useProductDetail(productName || '');

    return (
        <Stack sx={{ padding: '5px 150px', mt: 7 }}>
            <Stack direction={'row'} gap={5}>
                <img
                    src="https://i.pinimg.com/enabled_hi/564x/39/f0/bb/39f0bb0664cdf534463580ecd4c6a0d9.jpg"
                    alt="item" height={500} style={{ objectFit: 'contain', borderRadius: '10px' }}
                />
                <Stack sx={{ justifyContent: 'space-between', width: '100%' }}>
                    <Box sx={{ color: 'primary.main' }}>
                        <Typography variant="h4" sx={{ color: 'secondary.main', mb: 1 }}>{data?.productName}</Typography>
                        <Typography>Stock : {data?.Qty}</Typography>
                        <Typography>{data?.productDesc}</Typography>
                    </Box>
                    <Stack direction={'row'} justifyContent={'space-between'} sx={{ color: 'secondary.main', borderRadius: '10px', py: 2 }}>
                        <Typography sx={{ fontSize: '20px', color: 'primary.main' }}>Price : </Typography>
                        <Typography sx={{ fontSize: '20px' }}>Rp.{data?.price}</Typography>
                    </Stack>
                </Stack>
            </Stack>
            <Button  sx={{ bgcolor: 'primary.main', color: 'secondary.main', ":hover": { bgcolor: 'secondary.main', color: 'primary.main' }, my: 3 }}>
                Add to Cart
            </Button>
        </Stack>
    )
}

export default DetailProduct