import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import ListPage from './pages/list-page';
import SinglePage from './pages/details-page';
import AdminPage from './pages/admin-page';
import LoginPage from './pages/login-page';
import ContactPage from './pages/contact-page';
import AboutPage from './pages/about-page';
import RegisterPage from './pages/register-page';
import ForgotPasswordPage from './pages/forgot-password';
import AddPropertyPage from './pages/add-property-page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />
  },
  {
    path: '/sell-list',
    element: <AddPropertyPage />
  },
  {
    path: '/contact',
    element: <ContactPage />
  },
  {
    path: '/about',
    element: <AboutPage />
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordPage />
  },
  {
    path: '/listings',
    element: <ListPage />
  },
  {
    path: '/details/:id',
    element: <SinglePage />
  },
  {
    path: '/admin',
    element: <AdminPage />
  }]
);