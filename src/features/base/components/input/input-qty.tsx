import { FormControl } from '@mui/material';
import React, { useEffect } from 'react';
import CustomTextField from '../../../../components/custom-text-field';
import { NumericFormatProps, NumericFormat } from 'react-number-format';

interface CustomProps {
    onChange: (event: { target: { name: string; value: number } }) => void;
    name: string;
}

const NumericFormatCustom = React.forwardRef<NumericFormatProps, CustomProps>(
    function NumericFormatCustom(props, ref) {
        const { onChange, ...other } = props;

        return (
            <NumericFormat
                {...other}
                getInputRef={ref}
                onValueChange={(values) => {
                    const numericValue = Number(values.value);
                    if (!isNaN(numericValue)) {
                        onChange({
                            target: {
                                name: props.name,
                                value: numericValue,
                            },
                        });
                    }
                }}
                thousandSeparator
                valueIsNumericString
            />
        );
    },
);

export default function QtyInput({ register, setValueQty, errors, initialValue }: any) {
    const [values, setValue] = React.useState(initialValue || '');
    useEffect(() => {
        if (initialValue) {
            setValue(initialValue);
            setValueQty("qty", Number(initialValue));
        }
    }, [initialValue, setValueQty]);
    const handleChange = (event: any) => {
        const newValue = event.target.value;
        setValue(newValue);
        setValueQty("qty", newValue);
    };
    return (
        <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
            <CustomTextField
                label="Qty"
                value={values}
                {...register("qty", { required: "Qty is required" })}
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                slotProps={{
                    input: {
                        inputComponent: NumericFormatCustom as any,
                    },
                }}
                error={!!errors.qty}
                variant="outlined"
            />
        </FormControl>
    );
};
