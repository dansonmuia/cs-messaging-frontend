import { Box, Grid, Paper } from '@mui/material'
import { Route, Routes } from 'react-router-dom'

import SideMenu from '../components/SideMenu'
import TopNav from '../components/TopNav'
import Footer from '../components/Footer'
import AdminList from './AdminList'
import MessagesList from './MessagesList'
import AssignedMessagesList from './AssignedMessagesList'

const Dashboard = () => {
  return (
    <Grid container sx={{
        minHeight: '100vh',
        display: {
            xs: 'none',
            sm: 'flex',
        }
    }}>
        <Grid item xs={3}>
            <Paper sx={{
                margin: 0.5,
                height: '99%',
                position: 'fixed',
                width: '24vw',
            }}>
                <SideMenu/>
            </Paper>
        </Grid>

        <Grid item xs={9}>
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}>
                <TopNav/>
                <Paper elevation={0} sx={{
                    minHeight: '65vh',
                    flexGrow: 1,
                    bgcolor: 'lightGrey.main',
                    borderRadius: 0,
                    margin: 1,
                    padding: 3
                }}>
                    <Routes>
                        <Route path='/' index element={<MessagesList/>}/>
                        <Route path='/assigned-messages' element={<AssignedMessagesList/>}/>
                        <Route path='/admins' element={<AdminList/>}/>
                    </Routes>
                </Paper>
                <Footer/>
            </Box>
        </Grid>
    </Grid>
  )
}

export default Dashboard
