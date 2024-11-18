import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { ProfileEntity } from "../../../entities/profile-entity";
import { apiV1 } from "../../../utils/api";
import Cookies from "js-cookie";
import { CreateProfileFormInput, profileSchema } from "../schemas/profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdateProfileDTO } from "../dto/profile-dto";
import { toast } from "react-toastify";

export function useProfile() {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<CreateProfileFormInput>({
        resolver: zodResolver(profileSchema),
    });
    const queryClient = useQueryClient();

    async function getProfile() {
        const res = await apiV1.get<null, { data: ProfileEntity }>(
            `/profile/get`, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }
        )
        return res.data;
    };

    const { data, isLoading } = useQuery<ProfileEntity, null, ProfileEntity>({
        queryKey: ['profile'],
        queryFn: getProfile
    });

    async function updateProfile(data: UpdateProfileDTO) {
        const formData = new FormData();
        formData.append('username', data.username ?? '');
        formData.append('address', data.address ?? '');
        formData.append('gender', data.gender ?? '');
        formData.append('phone', String(data.phone) ?? '');
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }
        const res = await apiV1.put<null, { data: UpdateProfileDTO }>(
            `/profile/update`,
            formData, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        });
        queryClient.invalidateQueries({ queryKey: ['profile'] });
        return res.data;
    };

    const { mutateAsync: updateProfileAsync } = useMutation<
        UpdateProfileDTO,
        unknown,
        UpdateProfileDTO>({
            mutationKey: ['updateProfile'],
            mutationFn: updateProfile,
        });

    async function onSubmit(data: CreateProfileFormInput) {
        const profileData: UpdateProfileDTO = {
            username: data.username,
            address: data.address,
            gender: data.gender,
            phone: Number(data.phone),
            image: data.image
        };
        try {
            await updateProfileAsync(profileData);
            queryClient.invalidateQueries({ queryKey: ['profile'] });
            toast.success('Profile updated successfully!');
        } catch (error: unknown) {
            if (error instanceof Error) {
                toast.error(`Error updating profile: ${error.message}`);
            } else {
                toast.error('An unexpected error occurred.');
            }
        }
    }

    return {
        register,
        handleSubmit,
        errors,
        isLoading,
        data,
        onSubmit,
        setValue
    }
}