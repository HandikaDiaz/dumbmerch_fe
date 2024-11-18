import { Box, Button, Card, CardContent, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { LineMdMinusCircle, Icons8Plus, LineMdRemove } from '../../../../components/icons'
import { useCart, useDeleteCart } from '../../hooks/cart';
import { useAddQuantity, useRemoveQuantity } from '../../hooks/quantity';

function ProductItemDropdown() {
    const { data, isLoading } = useCart();
    const { onSubmitAdd } = useAddQuantity();
    const { onSubmitRemove } = useRemoveQuantity();
    const { handleDelete } = useDeleteCart();

    return (
        <Card sx={{ flexShrink: 0, scrollSnapAlign: 'start', bgcolor: 'transparent' }}>
            {data?.map((cart) => (
                cart.cartItem.map((item) => (
                    <Card
                        key={item.id}
                        sx={{ flexShrink: 0, scrollSnapAlign: 'start', bgcolor: 'transparent', mb: 2 }}>
                        <Stack direction="row" alignItems="start">
                            <Link to={`/detail/${item.product.id}`} style={{ textDecoration: 'none' }}>
                                <img
                                    style={{ height: 150, objectFit: 'cover', width: 100 }}
                                    src={Array.isArray(item.product.image) ? item.product.image[0]?.url : item.product.image?.url}
                                    title="cart" />
                            </Link>
                            <CardContent sx={{ width: '100%', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography
                                        sx={{
                                            color: 'secondary.main',
                                            fontSize: '18px',
                                            fontWeight: 'bold',
                                            display: 'flex',
                                            justifyContent: 'space-between'
                                        }}>
                                        {item.product.productName}
                                        <Button onClick={() => handleDelete(item.id)} sx={{ bgcolor: 'transparent', ":hover": { bgcolor: 'transparent' } }}>
                                            <LineMdRemove />
                                        </Button>
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: 'primary.main',
                                            fontSize: '16px',
                                            mt: 1
                                        }}>
                                        Rp.{(item.product.price ?? 0).toLocaleString('id-ID')}
                                    </Typography>
                                </Box>
                                <Stack direction="row" gap={1.5} alignItems="center" justifyContent="start" mt={5}>
                                    <Stack
                                        direction="row"
                                        border="1px solid white"
                                        sx={{ borderRadius: '10px', p: 1 }}>
                                        <Box sx={{ ml: 1.3, borderRight: '1px solid white', pr: 1.9, cursor: 'pointer' }} onClick={() => onSubmitRemove(item.cartId, item.productId)}>
                                            <LineMdMinusCircle />
                                        </Box>
                                        <Typography sx={{ fontSize: '18px', px: 6.5, color: 'primary.main' }}>
                                            {item.quantity}
                                        </Typography>
                                        <Box sx={{ mr: 1.3, borderLeft: '1px solid white', pl: 1.9, cursor: 'pointer' }} onClick={() => onSubmitAdd(item.cartId, item.productId)}>
                                            <Icons8Plus />
                                        </Box>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Stack>
                    </Card>
                ))
            ))}
        </Card>
    )
}

export default ProductItemDropdown