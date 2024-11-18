import { useState } from 'react';

export function useSnackbar() {
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const openSnackbar = (message: string) => {
        setSnackbarMessage(message);
        setSnackbarOpen(true);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return {
        snackbarOpen,
        snackbarMessage,
        openSnackbar,
        handleCloseSnackbar,
    };
}
