import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { ButtonLink } from '../../../../components/custom-button';
import CustomTextField from '../../../../components/custom-text-field';
import { LineMdMenuToCloseTransition } from '../../../../components/icons';
import { useCategory } from '../../hooks/category';
import { useProductCreate } from '../../hooks/product';
import PriceInput from '../input/input-price';
import QtyInput from '../input/input-qty';

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function AddProductModal({ isOpen, onClose }: InitialFocusModalProps) {
    const [fileName, setFileName] = useState('');
    const [categoryId, setCategoryId] = useState<string>('');

    const { register, handleSubmit, onSubmit, setValue, isLoading, errors } = useProductCreate(+categoryId);
    const { data } = useCategory();

    const handleFileChange = (event: any) => {
        const files = event.target.files;
        if (files.length > 0) {
            setFileName(files[0].name);
        }
    };
    const handleChangeCategory = (event: SelectChangeEvent<string>) => {
        const selectedValue = event.target.value;
        setCategoryId(selectedValue);
    };


    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ color: 'primary.main', margin: 'auto', width: '85%', height: 'auto', px: 5, py: 3, bgcolor: 'background.paper', justifyContent: 'center', mt: 1.8 }}>
                <ButtonLink to={''} onClick={onClose} sx={{ position: 'absolute', right: 77, top: 5, color: 'primary.main', borderRadius: 'rounded !important', width: '40px', height: '40px' }}>
                    <LineMdMenuToCloseTransition />
                </ButtonLink>
                <form onSubmit={handleSubmit(onSubmit)} encType='multipart/form-data'>
                    <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography id="modal-modal-title" variant="h6">
                            Add Product
                        </Typography>
                        <FormControl sx={{ width: '15%' }}>
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                label="Category"
                                {...register('categoryId')}
                                value={categoryId}
                                onChange={handleChangeCategory} >
                                {data?.map((category) => (
                                    <MenuItem key={category.id} value={category.id}>{category.categoryName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Stack>
                    <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Button
                                component="label"
                                tabIndex={-1}
                                sx={{ borderRadius: '5px 0 0 5px' }}>
                                <Typography sx={{ p: .5, fontSize: '13px' }}>Upload Image</Typography>
                                <CustomTextField {...register('image')} onChange={handleFileChange} sx={{ p: 0.2, display: 'none' }} type='file' />
                            </Button>
                            {fileName && <Typography sx={{ ml: 2, color: 'primary.main' }}>{fileName}</Typography>}
                        </Stack>
                    </FormControl>
                    <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                        <CustomTextField variant="outlined" {...register('productName')} label="Name" />
                    </FormControl>
                    <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                        <CustomTextField variant="outlined" {...register('productDesc')} label="Description" multiline rows={3} />
                    </FormControl>
                    <PriceInput register={register} setValuePrice={setValue} errors={errors} />
                    <QtyInput register={register} setValueQty={setValue} errors={errors} />
                    <Box sx={{ mt: 3 }}>
                        <Button disabled={isLoading} type='submit' sx={{ p: '5px 48.5%', backgroundColor: '#56c05a !important', ":hover": { backgroundColor: 'white !important', color: '#56c05a !important' } }}>
                            {isLoading ? "Loading..." : "Add"}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default AddProductModal;
