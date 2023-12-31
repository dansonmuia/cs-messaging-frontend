import logo from './assets/images/branch.jpg';
import user from './assets/images/user.png';

const siteUrls = {
    login: '/',
    dashboard: '/dashboard',
    listMessages: '/dashboard',
    admins: '/dashboard/admins',
    assignedMessages: '/dashboard/assigned-messages',
}

// const server = 'http://127.0.0.1:8000'
const server = 'https://branch-api.myduka.online'

const urls = {
    login: `${server}/login-for-token`,
    listAdmins: `${server}/users/`,
    listMessages: `${server}/messages/`,
    messageDetail: msgId => `${server}/messages/${msgId}`,
    listAssignedMessages: `${server}/messages/assign-me`,
}

export {
    logo,
    user,
    siteUrls,
    urls,
}
