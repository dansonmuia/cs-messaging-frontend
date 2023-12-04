import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import store from './redux/store'
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));

const theme = createTheme({
    palette: {
        primary: {
            main: '#1976d2'
        },
        lightBlue: {
            main: '#bbdefb'
        },
        darkBlue: {
            main: '#07233f'
        },
        lightGrey: {
            main: '#eeeeee'
        },
        darkGrey: {
            main: '#424242'
        },
    },
})

root.render(
    <Provider store={store}>
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <BrowserRouter>
                    <SnackbarProvider>
                        <App />
                    </SnackbarProvider>
                </BrowserRouter>
            </ThemeProvider>
        </React.StrictMode>
    </Provider>
);
