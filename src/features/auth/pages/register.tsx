import { Box, Typography } from '@mui/material'
import RegisterForm from '../components/form/register-form'

export default function RegisterPage() {
    return (
        <Box sx={{ backgroundColor: 'background.paper', padding: '15px' }}>
            <Typography variant="h4" sx={{ color: 'primary.main', backgroundColor: 'background.paper' }}>
                Register
            </Typography>
            <RegisterForm />
        </Box>
    )
}
