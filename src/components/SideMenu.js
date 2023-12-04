import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { Assignment, BusinessCenter, Email } from "@mui/icons-material";
import { styled } from "@mui/system";
import { Link } from "react-router-dom";

import ResponsiveImg from "./ResponsiveImg";
import { siteUrls, user } from "../constants";
import { useSelector } from "react-redux";


const LinkItem = styled(Link)(({theme})=>({
    textDecoration: 'none',
    color: theme.palette.darkGrey.main,
    width: '100%',
}))


const SideMenu = () => {
    const currentUser = useSelector(state => state.currentUser) || {};

    return (
        <>
        <Box sx={{
            margin: 0.5,
        }}>
            <Box>
                <LinkItem  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                }}>
                    <ResponsiveImg
                        src={user}
                        sx={{
                            width: 100,
                        }}
                    />
                    <Typography variant='h6' gutterBottom sx={{
                        alignSelf: 'center',
                        marginTop: 1,
                    }}>
                        {currentUser.name}
                    </Typography>
                    <Typography gutterBottom>{currentUser.email}</Typography>
                </LinkItem>

            </Box>

            <Divider sx={{
                bgcolor: 'darkGrey.main',
            }}/>

            <Box>
                <List>

                    <ListItem >
                        <LinkItem to={siteUrls.listMessages}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Email/>
                                </ListItemIcon>
                                <ListItemText primary="All Messages" />
                            </ListItemButton>
                        </LinkItem>
                    </ListItem>

                    <Divider sx={{mx: 2}}/>


                    <ListItem >
                        <LinkItem to={siteUrls.assignedMessages}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Assignment/>
                                </ListItemIcon>
                                <ListItemText primary="Assigned Messages" />
                            </ListItemButton>
                        </LinkItem>
                    </ListItem>

                    <Divider sx={{mx: 2}}/>


                    <ListItem >
                        <LinkItem to={siteUrls.admins}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <BusinessCenter/>
                                </ListItemIcon>
                                <ListItemText primary="Admins" />
                            </ListItemButton>
                        </LinkItem>
                    </ListItem>

                    <Divider sx={{mx: 2}}/>


                </List>

            </Box>
        </Box>

        </>
    );
}

export default SideMenu;
