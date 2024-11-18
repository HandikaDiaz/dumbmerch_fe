import { Avatar, Badge, IconButton, Input, Stack, Tooltip } from "@mui/material";
import React, { useState } from "react";
import logo from '../../../../assets/logo.svg';
import { ButtonLink } from "../../../../components/custom-button";
import { LineMdEmail, LineMdEmailAlert, LineMdPhoneIncoming, LineMdSearch, MdiLightCart } from "../../../../components/icons";
import { useCart } from "../../hooks/cart";
import { useProfile } from "../../hooks/profile";
import { useSearchContext } from "../../pages/search";
import DropDownCart from "../modal/cart";
import DropDownNavbar from "../modal/navbar";
import Cookies from "js-cookie";

function NavbarMember() {
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
    const { data: cartData } = useCart();
    const cartBadge = cartData?.reduce((acc, item) => acc + item.cartItem.length, 0);

    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const [anchorElCart, setAnchorElCart] = React.useState<null | HTMLElement>(null);
    const { setSearchQuery } = useSearchContext();
    const [inputValue, setInputValue] = useState("");

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleOpenCartMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElCart(event.currentTarget);
    };
    const handleCloseCartMenu = () => {
        setAnchorElCart(null);
    };
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setInputValue(query);
        setSearchQuery(query);
    };
    const badgeContent = 0;
    const { data } = useProfile();

    return (
        <Stack direction={'row'} p={2} sx={{ justifyContent: 'space-between' }}>
            <Stack sx={{ ml: 1.5 }} flex={1} direction={'row'} alignItems={'center'} justifyContent={'start'}>
                <img src={logo} alt="logo" width={50} />
                <ButtonLink to={'/'} sx={{ backgroundColor: 'transparent !important', ml: 4, fontSize: '20px' }}>DumbMerch</ButtonLink>
            </Stack>
            <Stack flex={3} direction={'row'} gap={2} sx={{ color: 'primary.main', alignItems: 'center' }} justifyContent={'center'}>
                <LineMdSearch />
                <Input sx={{ px: 1, width: '100%' }} placeholder="Search…" value={inputValue} onChange={handleSearchChange} />
            </Stack>
            <Stack direction={'row'} gap={1.6} justifyContent={'end'} sx={{ color: 'primary.main', alignItems: 'center' }} flex={1}>
                {userLogin.role === "ADMIN" ? (
                    <ButtonLink to={'/dashboard/complain'} sx={{ backgroundColor: 'transparent !important', mr: 2 }}>
                        <Badge color="error" badgeContent={badgeContent}>
                            {badgeContent > 0 ? <LineMdEmailAlert /> : <LineMdEmail />}
                        </Badge>
                    </ButtonLink>
                ) : (
                    <ButtonLink to={'/complain'} sx={{ backgroundColor: 'transparent !important', mr: 2 }}>
                        <Badge color="error" badgeContent={badgeContent}>
                            <LineMdPhoneIncoming />
                        </Badge>
                    </ButtonLink>
                )}
                <IconButton onClick={handleOpenCartMenu} sx={{ backgroundColor: 'transparent !important', mr: .5 }}>
                    {cartBadge && cartBadge > 0 ? (
                        <Badge color="error" badgeContent={cartBadge}>
                            <MdiLightCart />
                        </Badge>
                    ) : (
                        <MdiLightCart />
                    )}
                </IconButton>
                <Tooltip title="Profile">
                    <IconButton onClick={handleOpenUserMenu}>
                        <Avatar src={data?.image?.url} />
                    </IconButton>
                </Tooltip>
                <DropDownNavbar anchorEl={anchorElUser} handleClose={handleCloseUserMenu} />
                <DropDownCart anchorEl={anchorElCart} handleClose={handleCloseCartMenu} />
            </Stack>
        </Stack>
    )
}

export default NavbarMember