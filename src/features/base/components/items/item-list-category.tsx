import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import React from "react";
import { ButtonLink } from "../../../../components/custom-button";
import { useCategory } from "../../hooks/category";
import DeletCategoryModal from "../modal/delete-category";
import EditCategoryModal from "../modal/edit-category";
import { CategoryEntity } from "../../../../entities/category-entity";

function ItemListCategory() {
    const [openEdit, setOpenEdit] = React.useState(false);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = React.useState<CategoryEntity>({
        id: 0,
        categoryName: '',
    });
    

    const handleOpenEdit = (categoryId: CategoryEntity) => {
        setSelectedCategoryId(categoryId);
        setOpenEdit(true);
    };
    const handleCloseEdit = () => setOpenEdit(false);

    const handleOpenDelete = (categoryId: any) => {
        setSelectedCategoryId(categoryId);
        setOpenDelete(true);
    };
    const handleCloseDelete = () => setOpenDelete(false);

    const { data } = useCategory();
    return (
        <>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead sx={{ position: '' }}>
                        <TableRow>
                            <TableCell>No</TableCell>
                            <TableCell align="left">Category Name</TableCell>
                            <TableCell align="left">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Array.isArray(data) && data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell component="th" scope="row">
                                    {item.id}
                                </TableCell>
                                <TableCell align="left">{item.categoryName}</TableCell>
                                <TableCell align="left">
                                    <ButtonLink onClick={() => handleOpenEdit(item)} to="" sx={{ p: '5px 7.5%', backgroundColor: '#56c05a !important', ":hover": { backgroundColor: 'white !important', color: '#56c05a !important' } }}>Edit</ButtonLink>
                                    <ButtonLink onClick={() => handleOpenDelete(item.id)} to="" sx={{ p: '5px 5%', ml: 1.2}}>Delete</ButtonLink>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <EditCategoryModal isOpen={openEdit} onClose={handleCloseEdit} category={selectedCategoryId}/>
            <DeletCategoryModal isOpen={openDelete} onClose={handleCloseDelete} category={selectedCategoryId} />
        </>
    )
}

export default ItemListCategory