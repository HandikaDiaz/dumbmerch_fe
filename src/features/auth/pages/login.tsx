import { Box, Typography } from '@mui/material'
import LoginForm from '../components/form/login-form'

export default function LoginPage() {
    return (
        <Box sx={{ backgroundColor: 'background.paper', padding: '15px' }}>
            <Typography variant="h4" sx={{ color: 'primary.main', backgroundColor: 'background.paper' }}>
                Login
            </Typography>
            <LoginForm />
        </Box>
    )
}
