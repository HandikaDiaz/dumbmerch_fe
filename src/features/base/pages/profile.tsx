import { Box, Button, Stack, Typography } from "@mui/material"
import ProfileCard from "../components/card/profile-card"
import ProfileTransaction from "../components/items/profile-transaction"
import React from "react";
import EditProfileModal from "../components/modal/edit-profile";

function Profile() {
    const [openEdit, setOpenEdit] = React.useState(false);
    const handleOpenEdit = () => setOpenEdit(true);
    const handleCloseEdit = () => setOpenEdit(false);

    return (
        <Stack direction={'row'} sx={{ padding: '10px 70px' }}>
            <Box flex={1.7} sx={{ overflowY: 'auto' }} width={'100%'}>
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={'90%'}>
                    <Typography variant="h4" sx={{ color: 'secondary.main', mb: 2 }}>Profile</Typography>
                    <Button sx={{ bgcolor: '#56c05a', color: 'primary.main', ":hover": { bgcolor: 'secondary.main', color: 'primary.main' }, width: '50px', height: '35px' }} onClick={handleOpenEdit}>
                        Edit
                    </Button>
                </Stack>
                <ProfileCard />
            </Box>
            <Box flex={1} sx={{ overflowY: 'auto', height: '80vh' }}>
                <Typography variant="h4" sx={{ color: 'secondary.main', mb: 2, position: 'sticky', top: '0', backgroundColor: 'black', height: '55px' }}>My Transaction</Typography>
                <ProfileTransaction />
            </Box>
            <EditProfileModal isOpen={openEdit} onClose={handleCloseEdit} />
        </Stack>
    )
}

export default Profile