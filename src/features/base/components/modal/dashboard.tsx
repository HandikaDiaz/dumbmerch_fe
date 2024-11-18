import { Menu, MenuItem } from "@mui/material";
import { ButtonLink } from "../../../../components/custom-button";
import { LineMdCheckList3, LineMdFileDocument, LineMdTextBoxMultiple } from "../../../../components/icons";

interface DropDownProps {
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}

function DropDownDashboard({ anchorEl, handleClose }: DropDownProps) {
    const open = Boolean(anchorEl);

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
            onClose={handleClose}>
            <MenuItem onClick={handleClose} sx={{ px: 3.5, gap: 2, display: 'grid' }}>
                <ButtonLink
                    to={'/dashboard/list-order'}
                    sx={{ backgroundColor: 'transparent !important', alignItems: 'center', display: 'flex', width: '95%' }}>
                    <LineMdCheckList3 />Order List
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
            </MenuItem>
        </Menu>
    );
}

export default DropDownDashboard;
