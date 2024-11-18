import { Box, Stack } from "@mui/material";
import ComplainCard from "../components/card/complain-card";

function Complain() {    
    return (
        <Stack direction={'row'}>
            <Box width={'100%'} height={'85vh'} sx={{ borderTop: '1px solid #252525', overflowY: 'auto' }}>
                <ComplainCard />
            </Box>
        </Stack>
    )
}

export default Complain