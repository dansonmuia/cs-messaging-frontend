import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box bgcolor='darkBlue.main' color='white' paddingY={4}>
            <Typography variant="h6" textAlign='center'>
                Customer Service Messaging Platform
            </Typography>
            <Typography variant="body1" textAlign='center'  marginTop={2}>
                &copy; {new Date().getFullYear()} Branch International
            </Typography>
        </Box>
    );
}

export default Footer;
