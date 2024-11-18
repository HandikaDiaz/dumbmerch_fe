import { Box, Modal, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { useCartByCartId } from "../../hooks/cart";
import { ButtonLink } from "../../../../components/custom-button";
import { LineMdMenuToCloseTransition } from "../../../../components/icons";

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
    cartId: number | undefined;
}

function InfoOrderCart({ isOpen, onClose, cartId }: InitialFocusModalProps) {
    if (!cartId) {
        return null;
    }
    const { data } = useCartByCartId(cartId);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
        }
    }));

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ color: 'primary.main', margin: 'auto', width: '85%', height: 'auto', p: 10, bgcolor: 'background.paper', justifyContent: 'center', mt: 12 }}>
                <ButtonLink to={''} onClick={onClose} sx={{ position: 'absolute', right: 77, top: 82, color: 'primary.main', borderRadius: 'rounded !important', width: '40px', height: '40px' }}>
                    <LineMdMenuToCloseTransition />
                </ButtonLink>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>No</TableCell>
                                <TableCell align="left">ProductId</TableCell>
                                <TableCell align="left">Product Name</TableCell>
                                <TableCell align="left">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data?.map((cart) => (
                                <TableRow
                                    key={cart.id}
                                    sx={{}}>
                                    <StyledTableCell component="th" scope="row">
                                        {cart.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{cart.productId}</StyledTableCell>
                                    <StyledTableCell align="left">{cart.product.productName}</StyledTableCell>
                                    <StyledTableCell align="left">{cart.quantity}</StyledTableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Modal>
    )
}

export default InfoOrderCart