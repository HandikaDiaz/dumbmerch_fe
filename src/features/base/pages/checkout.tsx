import { Box, Button, FormControl, Stack, Typography } from "@mui/material"
import InfoCart from "../components/card/info-cart-card"
import ProductItemDropdown from "../components/items/product-item-drop"
import CustomTextField from "../../../components/custom-text-field"
import { ButtonLink } from "../../../components/custom-button"
import { useState } from "react"
import PhoneInput from "../components/input/input -phone"
import { usePayment } from "../hooks/payment"
import { useCart } from "../hooks/cart"

function Checkout() {
    const { handlePay } = usePayment();
    const { data } = useCart();
    const [valuesPhone, setValuesPhone] = useState({ numberformat: '' });
    const handleChangePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValuesPhone({ ...valuesPhone, [event.target.name]: event.target.value });
    };
    const cartId = data?.[0]?.id;
    const handleCheckout = () => {
        if (cartId) {
            handlePay(cartId);
        } else {
            console.log("Cart ID not found");
        }
    };

    return (
        <>
            <Typography>Checkout</Typography>
            <Stack direction={'row'} px={2} gap={2} height={'80vh'}>
                <Box flex={1} borderRight={'1px solid #252525'} sx={{ overflowY: 'auto' }}>
                    <ProductItemDropdown />
                </Box>
                <Box flex={1} gap={2} justifyContent={'space-between'} display={'flex'} flexDirection={'column'}>
                    <Typography sx={{ fontWeight: 'bold', fontSize: '20px', color: 'secondary.main', pb: 2 }}>
                        Order Summary
                        <InfoCart />
                    </Typography>
                    {/* <Stack direction={'row'} gap={2}>
                        <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                            <CustomTextField
                                label="Email address"
                                name="numberformat"
                                id="formatted-numberformat-input"
                                variant="outlined" />
                        </FormControl>
                        <PhoneInput value={valuesPhone.numberformat} onChange={handleChangePhone} label={"Phone"} id="phone-input" />
                    </Stack>
                    <Stack direction={'row'} gap={2}>
                        <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                            <CustomTextField
                                label="First name"
                                name="numberformat"
                                id="formatted-numberformat-input"
                                variant="outlined" />
                        </FormControl>
                        <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                            <CustomTextField
                                label="Last name"
                                name="numberformat"
                                id="formatted-numberformat-input"
                                variant="outlined" />
                        </FormControl>
                    </Stack>
                    <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                        <CustomTextField
                            label="address"
                            name="numberformat"
                            id="formatted-numberformat-input"
                            variant="outlined" />
                    </FormControl>
                    <Stack mb={4}>
                        <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                            <CustomTextField
                                label="Postcode"
                                name="numberformat"
                                id="formatted-numberformat-input"
                                variant="outlined" />
                        </FormControl>
                        <FormControl sx={{ backgroundColor: 'transparent', width: '100%', mt: 3 }}>
                            <CustomTextField
                                label="Description"
                                name="numberformat"
                                id="formatted-numberformat-input"
                                variant="outlined"
                                multiline
                                rows={2} />
                        </FormControl>
                    </Stack> */}
                    <Button onClick={handleCheckout} sx={{ p: '8px 48.5%', backgroundColor: '#56c05a !important', ":hover": { backgroundColor: 'white !important', color: '#56c05a !important' } }}>
                        Checkout
                    </Button>
                </Box>
            </Stack>
        </>
    )
}

export default Checkout