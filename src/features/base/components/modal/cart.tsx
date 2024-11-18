import { Drawer, Stack, IconButton } from "@mui/material";
import { ButtonLink } from "../../../../components/custom-button";
import ProductItemDropdown from "../items/product-item-drop";
import CloseIcon from "@mui/icons-material/Close";
import InfoCart from "../card/info-cart-card";

interface DropDownProps {
    anchorEl: null | HTMLElement;
    handleClose: () => void;
}

function DropDownCart({ anchorEl, handleClose }: DropDownProps) {
    const open = Boolean(anchorEl);

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={handleClose}
            PaperProps={{ sx: { width: 400, px: 2 } }}>
            <Stack direction="row" justifyContent="flex-end">
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </Stack>
            <Stack direction="column" gap={2}>
                <ButtonLink to="/cart" sx={{ backgroundColor: 'transparent !important', fontSize: '30px', fontWeight: 'bold' }}>
                    Cart
                </ButtonLink>
                <ProductItemDropdown />
                <hr />
                <InfoCart />
                <ButtonLink to={'/checkout'} sx={{ width: '100%', py: 1, fontSize: '18px', bgcolor: 'primary.main', color: 'secondary.main', mb: 3, ":hover": { bgcolor: 'secondary.main', color: 'primary.main' } }}>
                    Proceed to checkout
                </ButtonLink>
            </Stack>
        </Drawer>
    );
}

export default DropDownCart;
