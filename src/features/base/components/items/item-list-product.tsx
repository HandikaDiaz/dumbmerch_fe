import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { ButtonLink } from "../../../../components/custom-button";
import { ProductEntity, ProductEntityV2 } from "../../../../entities/product-entity";
import { useProduct } from "../../hooks/product";
import DeletProductModal from "../modal/delete-product";
import EditProductModal from "../modal/edit-product";

function ItemListProduct() {
    const { data } = useProduct();

    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectedProductId, setSelectedProductId] = React.useState<ProductEntity>({
        id: 0,
        productName: '',
        productDesc: '',
        price: 0,
        Qty: 0,
        image: { url: '', id: 0 },
    });
    const handleOpenEdit = (categoryId: ProductEntity) => {
        setSelectedProductId(categoryId);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = (categoryId: any) => {
        setSelectedProductId(categoryId);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => setOpenDelete(false);

    const sendProductToEdit = (row: ProductEntityV2) => ({
        id: row.id,
        productName: row.productName,
        productDesc: row.productDesc,
        price: row.price,
        Qty: row.Qty,
        image: { url: row.image[0].url, id: row.image[0].id },
    });

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
                            <TableCell align="left">Photo</TableCell>
                            <TableCell align="left">Product Name</TableCell>
                            <TableCell align="left">Product Desc</TableCell>
                            <TableCell align="left">Price</TableCell>
                            <TableCell align="left">Qty</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{}}>
                                <StyledTableCell component="th" scope="row">
                                    {row.id}
                                </StyledTableCell>
                                <StyledTableCell align="left"><ButtonLink to={row.image[0].url} sx={{ bgcolor: 'transparent', ":hover": { bgcolor: 'transparent' } }} target="_blank">{row.productName}.jpg</ButtonLink></StyledTableCell>
                                <StyledTableCell align="left">{row.productName}</StyledTableCell>
                                <StyledTableCell align="left">{row.productDesc}</StyledTableCell>
                                <StyledTableCell align="left">{row.price}</StyledTableCell>
                                <StyledTableCell align="left">{row.Qty}</StyledTableCell>
                                <StyledTableCell align="left" sx={{ wordSpacing: '10px' }}>
                                    <ButtonLink onClick={() => handleOpenEdit(sendProductToEdit(row))} to="" sx={{ p: '5px 9.5%', backgroundColor: '#56c05a !important', ":hover": { backgroundColor: 'white !important', color: '#56c05a !important' } }}>Edit</ButtonLink>
                                    <ButtonLink onClick={() => handleOpenDelete(row.id)} to="" sx={{ p: '5px 5%', ml: 1.2 }}>Delete</ButtonLink>
                                </StyledTableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditProductModal isOpen={openEdit} onClose={handleCloseEdit} product={selectedProductId} />
            <DeletProductModal isOpen={openDelete} onClose={handleCloseDelete} product={selectedProductId} />
        </>
    )
}

export default ItemListProduct