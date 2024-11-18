import { Menu, MenuItem } from "@mui/material";
import Cookies from "js-cookie";
import { ButtonLink } from "../../../../components/custom-button";
import { LineMdAccount, LineMdAlertSquare, LineMdFileDocument, LineMdLogout, LineMdTextBoxMultiple } from "../../../../components/icons";
import { useLogout } from "../../../auth/hooks/logout-hooks";
import { useProfile } from "../../hooks/profile";

interface DropDownProps {
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}

function DropDownNavbar({ anchorEl, handleClose }: DropDownProps) {
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
    const open = Boolean(anchorEl);
    const { data } = useProfile();
    const logout = useLogout();

    return (
        <Menu
            sx={{ mt: '55px' }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose} sx={{ px: 3.5, gap: 2, display: 'grid' }}>
                <ButtonLink state={data?.username} to={`/profile/${data?.username}`} sx={{ backgroundColor: 'transparent !important', alignItems: 'center', display: 'flex', width: '95%' }}>
                    <LineMdAccount />
                    Profile
                </ButtonLink>
                {userLogin && userLogin.role === "ADMIN" && (
                    <>
                        <ButtonLink
                            to={'/dashboard'}
                            sx={{ backgroundColor: 'transparent !important', alignItems: 'center', display: 'flex', width: '95%' }}>
                            <LineMdAlertSquare />Dashboard
                        </ButtonLink>
                        <ButtonLink
                            to={'/dashboard/list-product'}
                            sx={{ backgroundColor: 'transparent !important', alignItems: 'center', display: 'flex', width: '95%' }}>
                            <LineMdTextBoxMultiple />Product
                        </ButtonLink>
                        <ButtonLink
                            to={'/dashboard/list-category'}
                            sx={{ backgroundColor: 'transparent !important', alignItems: 'center', display: 'flex', width: '95%' }}>
                            <LineMdFileDocument />Category
                        </ButtonLink>
                    </>
                )}
                <ButtonLink to={''} sx={{ backgroundColor: 'transparent !important', alignItems: 'center', display: 'flex', width: '95%' }} onClick={logout}>
                    <LineMdLogout />
                    Logout
                </ButtonLink>
            </MenuItem>
        </Menu>
    );
}

export default DropDownNavbar;
