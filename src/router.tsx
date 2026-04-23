import { createHashRouter } from 'react-router';
import App from './App';
import { Home } from './pages/Home';
import { InvoiceDetails } from './pages/InvoiceDetails';

export const router = createHashRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        { index: true, element: <Home /> },
        { path: "invoice/:id", element: <InvoiceDetails /> }
      ]
    },
  ]
);
