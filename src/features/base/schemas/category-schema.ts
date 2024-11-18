import { z } from "zod";

export const categorySchema = z.object({
    categoryName : z.string().min(4, "At least 4 characters required!")
});

export type CreatecategoryFormInput = z.infer<typeof categorySchema>;