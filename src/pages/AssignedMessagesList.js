import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { SkipNext, SkipPrevious } from '@mui/icons-material'

import { setAssignedMessages } from '../redux/actions'
import MessageItem from '../components/MessageItem'
import { getData, postData } from '../helpers/httpUtils'
import { urls } from '../constants'


const AssignedMessagesList = () => {
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const messages = useSelector(state => state.assignedMessages) || []

    const [page, setCurrentPage] = useState(1)
    const [offset, setOffset] = useState(0)

    const nextPage = () => {
        setCurrentPage(page+1)
        setOffset(offset+50)
    }

    const previousPage = () => {
        if(page > 1) {
            setCurrentPage(page-1)
            setOffset(offset-50)
        }
    }

    const fetchMessages = async () => {
        try {
            const response = await getData(`${urls.listAssignedMessages}?offset=${offset}`, token)
            const responseData = await response.json()
            if (response.status === 200) {
                dispatch(setAssignedMessages(responseData))
            } else {
                enqueueSnackbar(responseData.detail, {variant: 'error'})
            }
        } catch (error) {
            enqueueSnackbar("Couldn't fetch messages.", {variant: 'error'})
            console.log(error)
        }
    }

    const assignMeMessages = async () => {
        try {
            const response = await postData(urls.listAssignedMessages, {}, token)
            if (response.status === 200) {
                fetchMessages()
                enqueueSnackbar('Messages assigned successfully.', {variant: 'success'})
            } else {
                const responseData = await response.json()
                enqueueSnackbar(responseData.detail, {variant: 'error'})
            }
        } catch (error) {
            enqueueSnackbar("Couldn't assign messages.", {variant: 'error'})
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMessages()
    }, [page])

    return (
    <Box>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 2,
        }}
        >
            <Typography variant="h6">
                Assigned Messages
            </Typography>
            <Button
                variant="contained" 
                sx={{
                    color: 'white',
                }}
                onClick={assignMeMessages}
            >
                Assign me Messages
            </Button>
        </Box>
        <Divider/>
        <Box my={3}>
            {
                messages.length > 0 ?
                messages.map(msg => (
                    <MessageItem key={msg.id} msg={msg}/>
                )) :
                <Typography textAlign='center'>
                    No assigned messages yet
                </Typography>
            }
            <Divider/>

            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: 2
            }}>
                <Stack direction="row" spacing={2} sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <IconButton disabled={page===1} onClick={previousPage}>
                        <SkipPrevious/>
                    </IconButton>
                    <Typography gutterBottom>
                        {page}
                    </Typography>
                    <IconButton disabled={messages.length<50} onClick={nextPage}>
                        <SkipNext/>
                    </IconButton>
                </Stack>
            </Box>

        </Box>
    </Box>
  )
}

export default AssignedMessagesList