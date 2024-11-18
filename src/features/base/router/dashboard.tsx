import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import NavbarMember from "../components/navbar/navbar-member";

function Dashboard() {
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
    if (userLogin.role !== "ADMIN") {
        return <Navigate to={"/"} />;
    }

    return (
        <>
            <NavbarMember />
            <Outlet />
        </>
    )
}

export default Dashboard