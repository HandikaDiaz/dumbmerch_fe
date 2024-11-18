import { Button, Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../../../../components/custom-button';
import { useAddCart } from '../../hooks/cart';

function ProductItem({ product }: any) {
  const { onSubmit } = useAddCart(product.id);

  return (
    <Card sx={{ width: '300px', flexShrink: 0, scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <Link to={`/detail/${product.productName}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          sx={{ height: 300 }}
          image={product.image[0].url}
          title="green iguana"
        />
        <CardContent sx={{ backgroundColor: 'background.paper' }}>
          <Typography sx={{ color: 'secondary.main', fontSize: '20px', fontWeight: 'bold' }}>{product.productName}</Typography>
          <Typography sx={{ color: 'primary.main', height: '20px' }}>{product.productDesc}</Typography>
          <Stack direction={'row'} justifyContent={'space-between'} mt={7}>
            <Typography sx={{ color: 'primary.main' }}>Rp.{product.price}</Typography>
            <Typography sx={{ color: 'primary.main' }}>Stock : {product.Qty}</Typography>
          </Stack>
        </CardContent>
      </Link>
      <Stack direction={'row'} width={'100%'} gap={.5}>
        <ButtonLink sx={{ width: '100%', fontSize: '18px', py: 1, bgcolor: 'primary.main', color: 'secondary.main', ":hover": { bgcolor: 'secondary.main', color: 'primary.main' } }} to={'/detail'}>View product</ButtonLink>
        <Button sx={{ width: '100%', py: 1 }} onClick={onSubmit}>Add to cart</Button>
      </Stack>
    </Card>
  )
}

export default ProductItem