import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import Board from './pages/kanban-board.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import EditTicket from './pages/edit-ticket-form.tsx';
import CreateTicket from './pages/create-ticket-form.tsx';
import Login from './pages/login-form.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Board />
      }, 
      {
        path: '/edit',
        element: <EditTicket />
      },
      {
        path: '/create',
        element: <CreateTicket />
      },
      {
        path: '/login',
        element: <Login />
      }
    ]
  }
])

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
