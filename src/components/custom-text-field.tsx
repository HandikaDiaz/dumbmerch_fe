import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

interface CustomTextFieldProps extends Omit<TextFieldProps, 'variant'> {
    variant?: 'filled' | 'outlined' | 'standard';
    inputComponent?: React.ElementType;
}

const CustomTextField = React.forwardRef<HTMLInputElement, CustomTextFieldProps>((props, ref) => {
    return (
        <TextField
            {...props}
            inputRef={ref}
            sx={{
                "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                        borderColor: 'gray',
                    },
                    "&:hover fieldset": {
                        borderColor: '#f74d4d',
                    },
                    "&.Mui-focused fieldset": {
                        borderColor: '#56c05a',
                    },
                },
                ...props.sx,
            }}
        />
    );
});

CustomTextField.displayName = "CustomTextField";

export default CustomTextField;
