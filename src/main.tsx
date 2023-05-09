import React from 'react';
import ReactDOM from 'react-dom/client';
import Cart from './pages/Cart.jsx';
import App from './App.tsx';
import NotFound from './pages/NotFound.jsx';
import Home from './pages/Home.jsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <NotFound />,
        children: [
            {
                element: <Home />,
                index: true,
            },
            {
                path: '/cart',
                element: <Cart />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
