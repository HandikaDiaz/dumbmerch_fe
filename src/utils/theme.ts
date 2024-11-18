import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: '#FFFFFF',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#ec4a4a',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#0B0B0B',
            paper: '#181818',
        },
        text: {
            primary: '#bebebe',
            secondary: '#6A6A6A',
        }
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    backgroundColor: '#f74d4d',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#FFFFFF',
                        color: '#f74d4d',
                    },
                },
            },
        },
        MuiAppBar: {
            styleOverrides: {
                root: {
                    backgroundColor: '#262626',
                    color: '#FFFFFF',
                },
            },
        },
        MuiInput: {
            styleOverrides: {
                root: {
                    backgroundColor: '#464646',
                    border: '2px solid #b7b7b7',
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: '#717171',
                    backgroundColor: 'transparent',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#FFFFFF',
                    backgroundColor: '#f74d4d',
                    '&:hover': {
                        backgroundColor: '#FFFFFF',
                        color: '#f74d4d',
                    },
                    width: '12%',
                    borderRadius: '4px',
                    textAlign: 'center',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                },
            },
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    backgroundColor: 'transparent',
                },
            },
        },
    }
});

export default theme;