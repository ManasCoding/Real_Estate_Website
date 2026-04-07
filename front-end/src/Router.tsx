import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ListPage from './pages/list-page.js';
import SinglePage from './pages/details-page';
import AdminPage from './pages/admin-page';
import LoginPage from './pages/login-page';
import ContactPage from './pages/contact-page';
import RegisterPage from './pages/register-page';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/contact',
        element: <ContactPage />,
    },
    {
        path: '/login',
        element: <LoginPage />,
    },
    {
        path: '/register',
        element: <RegisterPage />,
    },
    {
        path: '/listings',
        element: <ListPage />,
    },
    {
        path: '/details/:id',
        element: <SinglePage />,
    },
    {
        path: '/admin',
        element: <AdminPage />,
    }
]);
