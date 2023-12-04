import { Box, Divider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'

import { urls } from '../constants'
import { getData } from '../helpers/httpUtils'
import { setAdmins } from '../redux/actions'


const AdminList = () => {
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()

    const admins = useSelector(state=>state.admins) || []
    const token = useSelector(state => state.token)

    const fetchAdmins = async () => {
        try {
            const response = await getData(urls.listAdmins, token)
            const responseData = await response.json()
            if (response.status === 200) {
                dispatch(setAdmins(responseData))
            } else {
                enqueueSnackbar(responseData.detail, {variant: 'error'})
            }
        } catch (error) {
            enqueueSnackbar("Couldn't fetch admins.", {variant: 'error'})
            console.log(error)
        }
    }

    useEffect(() => {
        fetchAdmins()
    }, [])
    
    return (
    <Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 2,
        }}>
            <Typography variant="h6" gutterBottom>
                Admins
            </Typography>

        </Box>
        <Divider/>

        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Name
                        </TableCell>
                        <TableCell>
                            Email
                        </TableCell>
                        <TableCell>
                            Is active
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        admins.length > 0 ?
                        admins.map(admin=>(
                            <TableRow key={admin.id}>
                                <TableCell>
                                    {admin.name}
                                </TableCell>
                                <TableCell>
                                    {admin.email}
                                </TableCell>
                                <TableCell>
                                    {admin.is_active ? 'Yes' : 'No'}
                                </TableCell>
                            </TableRow>
                        )):
                        <TableRow>
                            <TableCell colSpan={5} align='center'>
                                No admins yet
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </Box>
  )
}

export default AdminList
