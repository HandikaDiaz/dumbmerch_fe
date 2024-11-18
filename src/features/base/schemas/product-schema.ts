import { z } from "zod";

export const productSchema = z.object({
    productName : z.string().min(4, "At least 4 characters required!"),
    categoryId: z.number().min(1, "Category is required"), 
    image : z.instanceof(FileList).optional(),
    productDesc : z.string().min(4, "At least 4 characters required!"),
    price : z.any(),
    qty : z.any()
});

export type CreateProductFormInput = z.infer<typeof productSchema>;