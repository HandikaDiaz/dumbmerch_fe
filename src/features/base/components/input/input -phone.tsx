import { FormControl } from '@mui/material';
import React, { useEffect } from 'react';
import CustomTextField from '../../../../components/custom-text-field';
import { NumericFormatProps, NumericFormat } from 'react-number-format';

interface CustomProps {
    onChange: (event: { target: { name: string; value: number } }) => void;
    name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(props, ref) {
    const { onChange, ...other } = props;

    return (
        <NumericFormat
            {...other}
            getInputRef={ref}
            onValueChange={(values) => {
                const numericValue = Number(values.value.replace(/[^0-9]/g, ''));
                if (!isNaN(numericValue)) {
                    onChange({
                        target: {
                            name: props.name,
                            value: numericValue,
                        },
                    });
                }
            }}
            valueIsNumericString
        />
    );
});

export default function PhoneInput({ register, setValuePhone, errors, initialValue }: any) {
    const [values, setValue] = React.useState(initialValue || '');

    useEffect(() => {
        if (initialValue) {
            setValue(initialValue);
        }
    }, [initialValue, setValuePhone]);

    const handleChange = (event: any) => {
        const newValue = event.target.value;
        setValue(newValue);
        setValuePhone('phone', newValue); 
    };

    return (
        <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 0.3 }}>
            <CustomTextField
                label="Phone"
                placeholder='08xx-xxxx-xxxx'
                value={values}
                {...register("phone", { required: "Phone is required" })}
                onChange={handleChange}
                name="phone"
                id="formatted-phone-input"
                error={!!errors.phone}
                slotProps={{
                    input: {
                        inputComponent: NumericFormatCustom as any,
                    },
                }}
                variant="outlined"
            />
        </FormControl>
    );
}
