import { Box, Button, Paper, Stack, Switch, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { siteUrls } from '../constants';
import { useSelector } from 'react-redux';

const MessageItem = ({msg}) => {
    const currentUser = useSelector(state => state.currentUser) || {};
    const navigate = useNavigate()

    return (
    <Paper sx={{
        padding: 2,
        my: 2,
    }}>
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
        }}>
            <Typography>
                Msg ID {msg.id}
            </Typography>
            <Typography>
                Customer ID: {msg.customer_id}
            </Typography>
            {
                (currentUser && currentUser.id == msg.assigned_to && !msg.is_closed) &&
                <Button variant='contained' size='small'
                    onClick={() => navigate(`${siteUrls.assignedMessages}/${msg.id}`)}
                >
                    Respond
                </Button>
            }

        </Box>

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
