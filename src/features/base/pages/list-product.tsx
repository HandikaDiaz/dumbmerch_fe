import { Box, Button, Stack, Typography } from '@mui/material'
import ItemListProduct from '../components/items/item-list-product'
import { LineMdPlus } from '../../../components/icons'
import React from 'react';
import AddProductModal from '../components/modal/add-product';

function ListProduct() {
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);

    return (
        <Box width={'90%'} sx={{ margin: 'auto', mt: 3 }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>List Product</Typography>
                <Button sx={{ px: 1.5, bgcolor: '#56c05a', color: 'primary.main', ":hover": { bgcolor: 'secondary.main', color: 'primary.main' } }} onClick={handleOpenAdd}>
                    Add <LineMdPlus />
                </Button>
            </Stack>
            <Box sx={{ overflowY: 'auto', height: '70vh' }}>
                <ItemListProduct />
            </Box>
            <AddProductModal isOpen={openAdd} onClose={handleCloseAdd} />
        </Box>
    )
}

export default ListProduct