import { Button, FormControl, Input, InputLabel, Stack } from '@mui/material'
import { useRegisterForm } from '../../hooks/register-hook';

export default function RegisterForm() {
    const { register, handleSubmit, onSubmit } = useRegisterForm();
    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <FormControl sx={{ backgroundColor: 'background.paper' }}>
                        <InputLabel sx={{ mt: 1 }}>Name</InputLabel>
                        <Input sx={{ p: 0.2 }} type='text' {...register('username')} />
                    </FormControl>
                    <FormControl sx={{ backgroundColor: 'background.paper' }}>
                        <InputLabel sx={{ mt: 1 }}>Email</InputLabel>
                        <Input sx={{ p: 0.2 }} type='text' {...register('email')} />
                    </FormControl>
                    <FormControl sx={{ backgroundColor: 'background.paper' }}>
                        <InputLabel sx={{ mt: 1 }}>Password</InputLabel>
                        <Input sx={{ p: 0.2 }} type='password' {...register('password')} />
                    </FormControl>
                    <Button sx={{ mt: 2 }} type='submit' >
                        Register
                    </Button>
                </Stack>
            </form>
        </>
    )
}
