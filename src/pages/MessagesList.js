import { Box, Button, Divider, IconButton, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { SkipNext, SkipPrevious } from '@mui/icons-material'

import { setMessages } from '../redux/actions'
import MessageItem from '../components/MessageItem'
import { getData } from '../helpers/httpUtils'
import { urls } from '../constants'


const MessagesList = () => {
    const token = useSelector(state => state.token)
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const messages = useSelector(state => state.messages) || []

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
            const response = await getData(`${urls.listMessages}?offset=${offset}`, token)
            const responseData = await response.json()
            if (response.status === 200) {
                dispatch(setMessages(responseData))
            } else {
                enqueueSnackbar(responseData.detail, {variant: 'error'})
            }
        } catch (error) {
            enqueueSnackbar("Couldn't fetch messages.", {variant: 'error'})
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
                Messages
            </Typography>
            <Button
                variant="contained" 
                sx={{
                    color: 'white',
                }}
            >
                Filter messages
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
                    No messages yet
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

export default MessagesList