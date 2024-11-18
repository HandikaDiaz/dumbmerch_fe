import { Box, Button, Stack, Typography } from '@mui/material'
import ItemListCategory from '../components/items/item-list-category'
import { LineMdPlus } from '../../../components/icons'
import AddCategoryModal from '../components/modal/add-category'
import React from 'react';

function ListCategory() {
    const [openAdd, setOpenAdd] = React.useState(false);
    const handleOpenAdd = () => setOpenAdd(true);
    const handleCloseAdd = () => setOpenAdd(false);
    
    return (
        <Box width={'90%'} sx={{ margin: 'auto', mt: 3 }}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography sx={{ color: 'primary.main', fontWeight: 'bold', mb: 2 }}>List Category</Typography>
                <Button sx={{ px: 1.5, bgcolor: '#56c05a', color: 'primary.main', ":hover": { bgcolor: 'secondary.main', color: 'primary.main' } }} onClick={handleOpenAdd}>
                    Add <LineMdPlus />
                </Button>
            </Stack>
            <Box sx={{ overflowY: 'auto', height: '70vh' }}>
                <ItemListCategory />
            </Box>
            <AddCategoryModal isOpen={openAdd} onClose={handleCloseAdd} />
        </Box>
    )
}

export default ListCategory