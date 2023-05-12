import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

import './index.css';
import { BrowserRouter } from 'react-router-dom';

// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <App />,
//         errorElement: <NotFound />,
//         children: [
//             {
//                 element: <Home />,
//                 index: true,
//             },
//             {
//                 path: '/cart',
//                 element: <Cart />,
//             },
//         ],
//     },
// ]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
);
