import { ExitToApp } from '@mui/icons-material'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import ResponsiveImg from './ResponsiveImg'
import { logo, siteUrls } from '../constants'
import { logout } from '../redux/actions'


const TopNav = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const logOutUser = () => {
         dispatch(logout())
         navigate(siteUrls.login)
    }

    return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
            <Toolbar sx={{
                backgroundColor: 'white',
            }}>
                <Container sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <Link to={siteUrls.dashboard}>
                        <ResponsiveImg src={`${logo}`} sx={{
                            width: 65,
                        }}/>
                    </Link>

                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                        <Button
                            variant="contained" 
                            endIcon={<ExitToApp/>}
                            sx={{
                                color: 'white',
                                backgroundColor: 'black',
                                '&:hover': {
                                    backgroundColor: 'red',
                                }
                            }}
                            onClick={logOutUser}
                        >
                            Logout
                        </Button>
                    </Box>
                </Container>

            </Toolbar>
        </AppBar>
    </Box>
  )
}

export default TopNav
