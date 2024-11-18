import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import SideNavAuth from '../components/navbar/nav-login'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom'

export default function AuthPage() {
    const token = Cookies.get("token");
    let userLogin = null;
    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            if (payloadBase64) {
                const decodedPayload = JSON.parse(atob(payloadBase64));
                userLogin = decodedPayload;
            }

        } catch (error) {
            console.error('Failed to decode token:', error);
        }
    }
    if (userLogin) {
        if (userLogin.role === "ADMIN") {
            return <Navigate to={"/dashboard"} />;
        } else {
            return <Navigate to={"/"} />;
        }
    }
    
    return (
        <Box display={'flex'} width={'100%'} height={'100vh'} sx={{ justifyContent: 'center', alignItems: 'center', p: 15 }}>
            <Box flex={1.8}>
                <SideNavAuth />
            </Box>
            <Box flex={1}>
                <Outlet />
            </Box>
        </Box>
    )
}
