import { Box, Button, Grid, Paper, Stack, Switch, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useSnackbar } from 'notistack'
import { siteUrls, urls } from '../constants'
import { getData, putData } from '../helpers/httpUtils'
import { ArrowBack } from '@mui/icons-material'
import TextInput from '../helpers/TextInput'

const RespondToMessage = () => {
    const [msg, setMsg] = useState(null)
    const [responseMsg, setResponseMsg] = useState('')
    const {msgId} = useParams()
    const token = useSelector(state => state.token)
    const { enqueueSnackbar } = useSnackbar()
    const navigate = useNavigate()
    const [errorFields, setErrorFields] = useState({})

    const quickResponses = [
        {short: 'ok', long: 'Ok, we will get back to you soon.'},
        {short: 'approved', long: 'Your loan is approved.'},
        {short: 'rejected', long: 'Your loan is rejected.'},
        {short: 'yes, pay', long: 'Yes, you need to pay your loan within 30 days after receiving.'},
        {short: 'sorry', long: 'Sorry, we cannot approve your loan at this time'},
        {short: 'received', long: 'We have received your payment. Thank you.'},
    ]

    const fetchMessage = async () => {
        try {
            const response = await getData(urls.messageDetail(msgId), token)
            const responseData = await response.json()
            if (response.status === 200) {
                setMsg(responseData)
            } else if (response.status == 422){
                setErrorFields(responseData)
            } else {
                enqueueSnackbar(responseData.detail, {variant: 'error'})
            }
        } catch (error) {
            enqueueSnackbar("Couldn't fetch message.", {variant: 'error'})
            console.log(error)
        }
    }

    const submitResponse = async () => {
        try {
            const rp = await putData(urls.messageDetail(msgId), {response: responseMsg}, token)
            const responseData = await rp.json()
            if (rp.status == 201) {
                enqueueSnackbar('Response submitted successfully.', {variant: 'success'})
                navigate(siteUrls.assignedMessages)
            } else if (rp.status == 422){
                setErrorFields(responseData)
            } else {
                enqueueSnackbar(responseData.detail, {variant: 'error'})
            }
        } catch (error) {
            enqueueSnackbar("Couldn't submit response.", {variant: 'error'})
            console.log(error)
        }
    }

    useEffect(() => {
        fetchMessage()
    }, [])

    return (
    <>
    <Button variant='contained' size='small'
        onClick={() => navigate(siteUrls.assignedMessages)}
        startIcon={<ArrowBack/>}
    >
        Assigned Messages
    </Button>
    <Paper sx={{
        padding: 2,
        my: 2,
    }}>
        {
            msg?

            <Box>
                <Typography gutterBottom fontWeight='bold'>
                    Msg ID {msg.id}
                </Typography>

                <Typography>
                    From customer:
                </Typography>

                <Grid container>
                    <Grid item xs={6}>
                        <Typography>Name: {msg.customer.name}</Typography>
                        <Typography>Customer ID: {msg.customer_id}</Typography>
                        <Typography>Loan Limit: {msg.customer.loan_limit}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography>Address: {msg.customer.address}</Typography>
                        <Typography>Phone: {msg.customer.phone}</Typography>
                    </Grid>
                </Grid>

                <Box>
                    <Typography fontWeight='bold' mt={2}>
                        Message:
                    </Typography>
                    <Typography>
                        {msg.body}
                    </Typography>

                    <Typography fontWeight='bold' mt={2}>
                        Response:
                    </Typography>
                    <Typography>
                        {msg.response}
                    </Typography>
                </Box>
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 2,
                }}>
                    <Stack direction="row" spacing={2} sx={{
                        alignItems: 'center',
                    }}>
                        <Typography>
                            Is urgent
                        </Typography>
                        <Switch checked={msg.is_urgent} disabled/>
                    </Stack>

                    <Typography>
                        Assigned to: {msg.assigned_to_user? msg.assigned_to_user.name: 'N/A'}
                    </Typography>

                    <Stack direction="row" spacing={2} sx={{
                        alignItems: 'center',
                    }}>
                        <Typography>
                            Is open
                        </Typography>
                        <Switch checked={!msg.is_closed} disabled/>
                    </Stack>
                </Box>
                <Box sx={{
                    mt: 2,
                }}>
                    <Typography fontWeight='bold'>
                        Quick Responses:
                    </Typography>
                    <Grid container spacing={1} my={2}>
                        {
                            quickResponses.map((qr, index) => (
                                <Grid item key={index} xs={2}>
                                    <Button variant='contained' sx={{
                                        backgroundColor: 'black',
                                        '&:hover': {
                                            backgroundColor: 'darkGrey.main',
                                        }
                                    }}
                                        onClick={() => setResponseMsg(qr.long)}
                                        title={qr.long}
                                    >
                                        {qr.short}
                                    </Button>
                                </Grid>
                            ))
                        }
                    </Grid>
                    <TextInput
                        id='response'
                        label='Response'
                        value={responseMsg}
                        onChange={(e) => setResponseMsg(e.target.value)}
                        multiline
                        errorFields={errorFields}
                    />

                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                    }}>
                        <Button variant='contained'
                            onClick={submitResponse}
                        >
                            Submit Response
                        </Button>
                    </Box>


                </Box>
            </Box>

            :
            <Typography>Loading...</Typography>
        }
    </Paper>
    </>
  )
}

export default RespondToMessage
