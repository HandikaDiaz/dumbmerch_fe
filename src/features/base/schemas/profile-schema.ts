import { z } from "zod";
import { GenderEnum } from "../../../entities/gender-entity";

export const profileSchema = z.object({
    username : z.string().min(4, "At least 4 characters required!"),
    address : z.string().min(4, "At least 4 characters required!"),
    gender : z.nativeEnum(GenderEnum),
    phone : z.any(),
    image : z.instanceof(FileList).optional()
});

export type CreateProfileFormInput = z.infer<typeof profileSchema>;