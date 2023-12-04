import { Box, Grid, Paper, Stack, Switch, Typography } from '@mui/material'
import React from 'react'

const MessageItem = ({msg}) => {
  return (
    <Paper sx={{
        padding: 2,
        my: 2,
    }}>
        <Grid container>
            <Grid item xs={7}>
                <Typography gutterBottom>
                    Msg ID {msg.id}
                </Typography>
            </Grid>
            <Grid item xs={5}>
                <Typography>
                    Customer ID: {msg.customer_id}
                </Typography>
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
    </Paper>
  )
}

export default MessageItem
