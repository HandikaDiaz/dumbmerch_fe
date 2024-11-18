import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../../store/auth/auth-slice";
import { apiV1 } from "../../../utils/api";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

export function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = async () => {
        const logoutPromise = apiV1.post('/auth/logout').then(() => {
            Cookies.remove('token');
            dispatch(removeUser());
            toast.success("Successfully logged out!");
            navigate('/login', { replace: true });
        });
        try {
            await logoutPromise;
        } catch (error) {
            toast.error("Logout failed. Please try again.");
            console.log(error);
        }
    };

    return logout;
}