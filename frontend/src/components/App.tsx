import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BasicReactQuery from 'routes/BasicReactQuery';
import Root from 'routes/Root';
import Layout from './Layout';
import { MantineProvider } from '@mantine/core';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Root />,
        errorElement: <div>Not found</div>
      },
      {
        path: '/basic-react-query',
        element: <BasicReactQuery />
      }
    ]
  }
]);

const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <MantineProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}

export default App;
