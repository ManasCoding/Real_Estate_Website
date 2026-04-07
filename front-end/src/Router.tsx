import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ListPage from './pages/list-page.js';
import SinglePage from './pages/details-page.js';
import AdminPage from './pages/admin-page.tsx';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
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
