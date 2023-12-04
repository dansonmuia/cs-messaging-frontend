import logo from './assets/images/branch.jpg';

const siteUrls = {
    login: '/',
    dashboard: '/dashboard',
    listMessages: '/dashboard',
    admins: '/dashboard/admins',
}

const server = 'http://127.0.0.1:8000'

const urls = {
    login: `${server}/login-for-token`,
    listAdmins: `${server}/users/`,
}

export {
    logo,
    siteUrls,
    urls,
}
