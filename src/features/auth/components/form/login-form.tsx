import { Button, FormControl, Input, InputLabel, Stack } from '@mui/material';
import { useLoginForm } from '../../hooks/login-hook';

export default function LoginForm() {
    const { register, handleSubmit, onSubmit } = useLoginForm();

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Stack>
                    <FormControl sx={{ backgroundColor: 'background.paper' }}>
                        <InputLabel sx={{ mt: 1 }}>Email</InputLabel>
                        <Input sx={{ p: 0.2 }} type='text' {...register('username')} />
                    </FormControl>
                    <FormControl sx={{ backgroundColor: 'background.paper' }}>
                        <InputLabel sx={{ mt: 1 }}>Password</InputLabel>
                        <Input sx={{ p: 0.2 }} type='password' {...register('password')} />
                    </FormControl>
                    <Button sx={{ mt: 2 }} type='submit'>
                        Login
                    </Button>
                </Stack>
            </form>
        </>
    )
}
