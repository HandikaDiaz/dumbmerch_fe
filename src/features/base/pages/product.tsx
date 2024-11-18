import { Box, Stack, Typography } from "@mui/material"
import ProductItem from "../components/items/product-item"
import { useRef } from "react";
import { useProduct } from "../hooks/product";
import { useSearchContext } from "./search";

function Product() {
    const { data } = useProduct();
    const { searchQuery } = useSearchContext();
    const containerRef = useRef<HTMLDivElement>(null);
    const filteredData = data?.filter(product =>
        product.productName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return (
        <>
            <Stack sx={{ padding: '10px 70px 30px 70px' }}>
                <Typography variant="h4" sx={{ color: 'secondary.main', m: '5px 0 20px 0' }}>Products</Typography>
                <Box ref={containerRef} sx={{ display: "flex", gap: "13px", overflowX: "auto" }}>
                    {filteredData?.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </Box>
            </Stack>
        </>
    )
}

export default Product