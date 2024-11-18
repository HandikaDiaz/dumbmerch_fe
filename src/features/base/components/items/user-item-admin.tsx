import { Avatar, Box, Stack, Typography } from "@mui/material";

function UserItemAdmin({ username, lastMessage, image, onClick }: any) {
    return (
        <Stack direction={'row'} gap={2} alignItems={'center'} mx={4} mt={2} mb={4} justifyContent={'left'} onClick={onClick} style={{ cursor: 'pointer' }}>
            <Avatar alt={username} src={image} />
            <Box>
                <Typography sx={{ fontSize: '14px', color: 'primary.main' }}>{username}</Typography>
                <Typography sx={{ fontSize: '14px', color: 'text.primary' }}>{lastMessage}</Typography>
            </Box>
        </Stack>
    );
}

export default UserItemAdmin;
