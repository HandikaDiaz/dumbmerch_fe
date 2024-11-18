import { FormControl } from "@mui/material";
import React, { useEffect } from "react";
import { NumericFormat, NumericFormatProps } from 'react-number-format';
import CustomTextField from "../../../../components/custom-text-field";

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
                prefix="Rp."
            />
        );
    },
);

export default function PriceInput({ register, setValuePrice, errors, initialValue }: any) {
    const [values, setValue] = React.useState(initialValue || '');
    useEffect(() => {
        if (initialValue) {
            setValue(initialValue);
            setValuePrice("price", Number(initialValue));
        }
    }, [initialValue, setValuePrice]);
    const handleChange = (event: any) => {
        const newValue = event.target.value;
        setValue(newValue);
        setValuePrice("price", Number(newValue));
    };

    return (
        <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
            <CustomTextField
                label="Price"
                value={values}
                {...register("price", { required: "Price is required" })}
                onChange={handleChange}
                name="numberformat"
                id="formatted-numberformat-input"
                error={!!errors.price}
                slotProps={{
                    input: {
                        inputComponent: NumericFormatCustom as any,
                    },
                }}
                variant="outlined"
            />
        </FormControl>
    );
};