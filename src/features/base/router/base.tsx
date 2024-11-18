import { Navigate, Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import NavbarMember from '../components/navbar/navbar-member'
import { useAppSelector } from '../../../store/hooks/global-hook';

export default function BasePage() {
    const user = useAppSelector((state) => state.auth);

    if (!Object.keys(user).length) return <Navigate to={"/login"} />;
    if (!user.id) return <Navigate to={"/login"} />;
    return (
        <Box>
            <NavbarMember />
            <Box sx={{ overflowY: 'auto' }}>
                <Outlet />
            </Box>
        </Box>
    )
}
