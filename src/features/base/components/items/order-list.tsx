import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import { useAllCart } from "../../hooks/cart";
import { ButtonLink } from "../../../../components/custom-button";
import InfoOrderCart from "../modal/view-order-list";
import React, { useEffect } from "react";
import { CartEntity } from "../../../../entities/cart-entity";
import { format } from "date-fns";

function OrderListProduct() {
    const { data } = useAllCart();
    const [openInfo, setopenInfo] = React.useState(false);
    const [selectedCartId, setselectedCartId] = React.useState<CartEntity | undefined>();
    const handleOpenInfo = (cartId: CartEntity) => {
        setselectedCartId(cartId);
    };
    useEffect(() => {
        if (selectedCartId) {
            setopenInfo(true);
        }
    }, [selectedCartId]);
    const handleCloseInfo = () => {
        setopenInfo(false);
        setselectedCartId(undefined);
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.main,
        }
    }));

    return (
        <>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="left">User</TableCell>
                            <TableCell align="left">CreatedAt</TableCell>
                            <TableCell align="left">Total Amount</TableCell>
                            <TableCell align="left">More Info</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((cart) => {
                            const formattedDate = format(new Date(cart.createdAt), "EEEE, dd MMMM yyyy");
                            return (
                                <TableRow
                                    key={cart.id}
                                    sx={{}}>
                                    <StyledTableCell component="th" scope="row">
                                        {cart.id}
                                    </StyledTableCell>
                                    <StyledTableCell align="left">{cart.status}</StyledTableCell>
                                    <StyledTableCell align="left">{cart.user?.email}</StyledTableCell>
                                    <StyledTableCell align="left">{formattedDate}</StyledTableCell>
                                    <StyledTableCell align="left">{cart.totalAmount}</StyledTableCell>
                                    <StyledTableCell align="left" sx={{ wordSpacing: '10px' }}>
                                        <ButtonLink onClick={() => handleOpenInfo(cart)} to="" sx={{ p: '5px 9.5%', backgroundColor: '#56c05a !important', ":hover": { backgroundColor: 'white !important', color: '#56c05a !important' } }}>
                                            View
                                        </ButtonLink>
                                    </StyledTableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <InfoOrderCart isOpen={openInfo} onClose={handleCloseInfo} cartId={selectedCartId?.id} />
        </>
    )
}

export default OrderListProduct