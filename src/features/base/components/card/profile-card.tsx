import { Box, Stack, Typography } from "@mui/material"
import { useProfile } from "../../hooks/profile"

function ProfileCard() {
    const { data } = useProfile(); 
    
    return (
        <Stack direction={'row'} gap={5}>
            <img
                src={data?.image?.url}
                alt="item" height={400} style={{ objectFit: 'contain', borderRadius: '10px' }}
            />
            <Box>
                <Box sx={{ mb: 1.5 }}>
                    <Typography sx={{ color: 'secondary.main' }}>Name</Typography>
                    <Typography sx={{ color: 'primary.main' }}>{data?.username}</Typography>
                </Box>
                <Box sx={{ mb: 1.5 }}>
                    <Typography sx={{ color: 'secondary.main' }}>Email</Typography>
                    <Typography sx={{ color: 'primary.main' }}>{data?.user?.email}</Typography>
                </Box>
                <Box sx={{ mb: 1.5 }}>
                    <Typography sx={{ color: 'secondary.main' }}>Phone</Typography>
                    <Typography sx={{ color: 'primary.main' }}>{data?.phone}</Typography>
                </Box>
                <Box sx={{ mb: 1.5 }}>
                    <Typography sx={{ color: 'secondary.main' }}>Gender</Typography>
                    <Typography sx={{ color: 'primary.main' }}>{data?.gender}</Typography>
                </Box>
                <Box sx={{ mb: 1.5 }}>
                    <Typography sx={{ color: 'secondary.main' }}>Address</Typography>
                    <Typography sx={{ color: 'primary.main' }}>{data?.address}</Typography>
                </Box>
            </Box>
        </Stack>
    )
}

export default ProfileCard