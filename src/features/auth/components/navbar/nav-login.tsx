import { Stack, Typography } from '@mui/material';
import { ButtonLink } from '../../../../components/custom-button';
import logo from '../../../../assets/logo.svg'

function SideNavAuth() {
    return (
        <>
            <img src={logo} alt="logo" width={250} />
            <Stack gap={2}>
                <Typography variant="h3" sx={{ color: 'primary.main' }}>
                    Easy, Fast and Reliable
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                    Go shoping for merchandise, just go to dumb merch shopping. <br />The biggest merchandise in Indonesia
                </Typography>
                <Stack direction={'row'} gap={1}>
                    <ButtonLink sx={{ p: 1, width: '13%' }} to={'/login'}>
                        Login
                    </ButtonLink>
                    <ButtonLink sx={{ p: 1, width: '13%' }} to={'/register'}>
                        Register
                    </ButtonLink>
                </Stack>
            </Stack>
        </>
    )
}

export default SideNavAuth