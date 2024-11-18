import { Alert, Snackbar } from '@mui/material';

const SnackbarAlert = ({ open, message, onClose }: any) => {
    return (
        <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity="success" sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    );
};

export default SnackbarAlert;