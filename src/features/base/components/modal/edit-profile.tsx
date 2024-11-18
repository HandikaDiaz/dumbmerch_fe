import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { ButtonLink } from '../../../../components/custom-button';
import CustomTextField from '../../../../components/custom-text-field';
import { LineMdMenuToCloseTransition } from '../../../../components/icons';
import { useProfile } from '../../hooks/profile';
import PhoneInput from '../input/input -phone';

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function EditProfileModal({ isOpen, onClose }: InitialFocusModalProps) {
    const { register, handleSubmit, onSubmit, errors, data, isLoading, setValue } = useProfile();

    const [fileName, setFileName] = useState('');
    useEffect(() => {
        if (data) {
            setValue('username', data.username || '');
            setValue('address', data.address || '');
            setValue('gender', data.gender || '');
            setValue('phone', data.phone || '');
            if (data.image) {
                setFileName(data.image.url || '');
            }
        }
    }, [data, setValue]);
    const onError = (error: unknown) => {
        console.log(error);
    }

    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ color: 'primary.main', margin: 'auto', width: '85%', height: 'auto', px: 10, py: 3, bgcolor: 'background.paper', justifyContent: 'center', mt: 4 }}>
                <ButtonLink to={''} onClick={onClose} sx={{ position: 'absolute', right: 77, top: 22, color: 'primary.main', borderRadius: 'rounded !important', width: '40px', height: '40px' }}>
                    <LineMdMenuToCloseTransition />
                </ButtonLink>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Edit Profile
                </Typography>
                <form onSubmit={handleSubmit(onSubmit, onError)}>
                <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                        <Stack direction={'row'} alignItems={'center'}>
                            <Button
                                component="label"
                                tabIndex={-1}
                                sx={{ borderRadius: '5px 0 0 5px' }}>
                                <Typography sx={{ p: .5, fontSize: '13px' }}>Upload Image</Typography>
                                <CustomTextField {...register('image')} sx={{ p: 0.2, display: 'none' }} type='file' />
                            </Button>
                            {fileName && <Typography sx={{ ml: 2, color: 'primary.main' }}>{fileName}</Typography>}
                        </Stack>
                    </FormControl>
                    <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                        <CustomTextField variant="outlined" label="Name" {...register('username')} />
                    </FormControl>
                    <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                        <PhoneInput register={register} setValuePhone={setValue} errors={errors} initialValue={data?.phone || ''}  />
                    </FormControl>
                    <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Gender"
                            {...register('gender')}
                            defaultValue={data?.gender || ''} 
                            sx={{
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: 'gray',
                                },
                                "&:hover .MuiOutlinedInput-notchedOutline": {
                                    borderColor: '#f74d4d',
                                },
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                                    borderColor: '#56c05a',
                                },
                            }}>
                            <MenuItem key={'MALE'} value={'MALE'}>Male</MenuItem>
                            <MenuItem key={'FEMALE'} value={'FEMALE'}>Female</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                        <CustomTextField variant="outlined" label="Address" multiline rows={3} value={data?.address} {...register('address')} />
                    </FormControl>
                    <Box sx={{ mt: 3 }}>
                        <Button type='submit' sx={{ p: '5px 48.5%', backgroundColor: '#56c05a !important', ":hover": { backgroundColor: 'white !important', color: '#56c05a !important' } }}>
                            {isLoading ? "Loading..." : "Update"}
                        </Button>
                    </Box>
                </form>
            </Box>
        </Modal>
    );
}

export default EditProfileModal;
