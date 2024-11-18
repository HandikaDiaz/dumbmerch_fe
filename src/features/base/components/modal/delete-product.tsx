import { Box, Modal, Typography } from '@mui/material';
import { ButtonLink } from '../../../../components/custom-button';
import { ProductEntity } from '../../../../entities/product-entity';
import { useProductDelete } from '../../hooks/product';

interface InitialFocusModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: ProductEntity;
}

function DeletProductModal({ isOpen, onClose, product }: InitialFocusModalProps) {
    const { handleDelete } = useProductDelete(+product);

    return (
        <Modal
            open={isOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={{ color: 'primary.main', margin: 'auto', width: '50%', height: 'auto', p: 7, bgcolor: 'background.paper', justifyContent: 'center', mt: 19 }}>
                <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                    Delete Data
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Are you sure you want to delete this product?
                </Typography>
                <Box sx={{ mt: 6, display: 'flex', justifyContent: 'right', gap: 1 }}>
                    <ButtonLink to="" sx={{ p: '5px 52.5px 5px 30px', backgroundColor: '#56c05a !important', ":hover": { backgroundColor: 'white !important', color: '#56c05a !important' } }} onClick={handleDelete}>
                            Yes
                        </ButtonLink>
                    <ButtonLink to="" sx={{ p: '5px 52.5px 5px 30px', backgroundColor: '#f74d4d !important', ":hover": { backgroundColor: 'white !important', color: '#f74d4d !important' } }} onClick={onClose}>
                        No
                    </ButtonLink>
                </Box>
            </Box>
        </Modal>
    );
}

export default DeletProductModal;
