import { Box, Button, Grid, Paper, Typography } from "@mui/material"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"

import Footer from "../components/Footer"
import { logo, siteUrls, urls } from "../constants"
import TextInput from "../helpers/TextInput"
import { postData } from "../helpers/httpUtils"
import { setCurrentUser, setToken } from "../redux/actions"


const Login = () => {
    const [state, setState] = useState({
        email: '',
        password: '',
    })
    const [errorFields, setErrorFields] = useState({})

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {enqueueSnackbar} = useSnackbar()

    const loginUser = async () => {
        if (!state.password && state.email) {
            enqueueSnackbar('Provide email and password', {variant: 'error'})
        } else {
            try {
                const response = await postData(urls.login, state)
                const responseData = await response.json()
                if (response.status === 200) {
                    enqueueSnackbar('Login successful', {variant: 'success'})
                    dispatch(setCurrentUser(responseData.user))
                    dispatch(setToken(responseData.access_token))
                    navigate(siteUrls.dashboard)

                } else if(response.status === 400) {
                    enqueueSnackbar(responseData.detail, {variant: 'error'})

                } else if (response.status == 422) {
                    setErrorFields(responseData)

                } else {
                    enqueueSnackbar("Couldn't login. Try again later?", {variant: 'error'})
                    console.log(responseData)
                }
            } catch (error) {
                enqueueSnackbar("Couldn't login. Try again later?", {variant: 'error'})
                console.log(error)
            }
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        loginUser()
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
        }}>
                <Box sx={{
                    width: '100%',
                    flexGrow: 1,
                }}>
                    <Grid container>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="h4" textAlign='center' fontWeight={300} color='darkgrey.main' marginTop={8}>
                                Branch CS
                            </Typography>
                            <Typography variant="h6" textAlign='center' fontWeight={100}>
                                Messaging Platform
                            </Typography>
                            <Box sx={{
                                marginY: 3,
                                height: 250,
                                width: '100%',
                                backgroundImage: `url(${logo})`,
                                backgroundPosition: 'center',
                                backgroundSize: 'contain',
                                backgroundRepeat: 'no-repeat',
                            }}>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <Paper sx={{
                                width: '80%',
                                height: '80%',
                                backgroundColor: 'lightGrey.main',
                                padding: 3,
                            }}>
                                <Box sx={{
                                    marginBottom: 3,
                                }}
                                >
                                    <Typography variant="h6" textAlign='center' fontWeight={400} marginTop={3}>
                                        Login here
                                    </Typography>

                                    <form onSubmit={handleFormSubmit}>
                                        <TextInput
                                            id='email'
                                            label='Email'
                                            value={state.email}
                                            onChange={(e)=>setState({...state, email: e.target.value})}
                                            errorFields={errorFields}
                                        />
                                        <TextInput
                                            id='password'
                                            label='Password'
                                            type='password'
                                            value={state.password}
                                            onChange={(e)=>setState({...state, password: e.target.value})}
                                            errorFields={errorFields}
                                        />

                                        <Button variant="contained" fullWidth sx={{
                                            marginTop: 3,
                                            paddingY: 1,
                                            color: 'white',
                                        }}
                                            type="submit"
                                            onClick={handleFormSubmit}
                                        >
                                            Login
                                        </Button>
                                    </form>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            <Footer/>
        </Box>
    )
}

export default Login
