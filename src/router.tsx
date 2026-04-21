import { createBrowserRouter } from 'react-router';
import App from './App';
import { Home } from './pages/Home';
import { InvoiceDetails } from './pages/InvoiceDetails';

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "invoice/:id", element: <InvoiceDetails /> }
      ]
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  }
);
