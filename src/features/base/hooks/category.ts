import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { categorySchema, CreatecategoryFormInput } from "../schemas/category-schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiV1 } from "../../../utils/api";
import { CategoryEntity } from "../../../entities/category-entity";
import { CreateCategoryDTO, RequestCategoryDto } from "../dto/category-dto.";
import Cookies from "js-cookie";
import { toast } from 'react-toastify';

export function useCategory() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CreatecategoryFormInput>({
        resolver: zodResolver(categorySchema),
    });
    const queryClient = useQueryClient();

    async function getCategory() {
        const res = await apiV1.get<null, { data: CategoryEntity[] }>(
            '/category/get-all'
        );
        return res.data;
    }

    const { data, isLoading } = useQuery<CategoryEntity[], null, CategoryEntity[]>({
        queryKey: ['category'],
        queryFn: getCategory
    });

    async function createCategory(data: RequestCategoryDto) {
        const res = await apiV1.post('/category/create', data, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        queryClient.invalidateQueries({ queryKey: ['category'] });
        toast.success('Category created successfully!');
        return res.data;
    }

    const { mutateAsync: createCategoryAsync } = useMutation<
        CreateCategoryDTO,
        null,
        CreateCategoryDTO>({
            mutationKey: ['createCategory'],
            mutationFn: createCategory,
        });

    async function onSubmit(data: CreatecategoryFormInput) {
        try {
            await createCategoryAsync(data);
            queryClient.invalidateQueries({ queryKey: ['category'] });
            reset();
        } catch (error) {
            console.log(error);
            toast.error('Failed to create category.');
        }
    }

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        data,
        isLoading
    };
}

export function useCategoryUpdate(categoryId: number) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<CreatecategoryFormInput>({
        resolver: zodResolver(categorySchema),
    });
    const queryClient = useQueryClient();

    async function updateCategory(data: RequestCategoryDto) {
        const res = await apiV1.put(`/category/edit/${categoryId}`, data, {
            headers: {
                Authorization: `Bearer ${Cookies.get("token")}`
            }
        });
        queryClient.invalidateQueries({ queryKey: ['category'] });
        toast.success('Category updated successfully!');
        return res.data;
    }

    const { mutateAsync: updateCategoryAsync } = useMutation<
        CreateCategoryDTO,
        null,
        CreateCategoryDTO>({
            mutationKey: ['updateCategory'],
            mutationFn: updateCategory,
        });

    async function onSubmit(data: CreatecategoryFormInput) {
        try {
            await updateCategoryAsync(data);
            queryClient.invalidateQueries({ queryKey: ['category'] });
        } catch (error) {
            console.log(error);
            toast.error('Failed to update category.');
        }
    }

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
        setValue
    };
}

export function useCategoryDelete(categoryId: number) {
    const queryClient = useQueryClient();

    const handleDelete = async () => {
        try {
            const res = await apiV1.delete(`/category/delete/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            queryClient.invalidateQueries({ queryKey: ['category'] });
            toast.success('Category deleted successfully!');
            return res.data;
        } catch (error) {
            console.log(error);
            toast.error('Failed to delete category.');
        }
    }

    return {
        handleDelete
    };
}