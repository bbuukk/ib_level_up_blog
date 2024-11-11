import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StrictMode } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import BasicReactQuery from 'routes/BasicReactQuery';
import Root, { articlesLoader } from 'routes/Root';
import Layout from './Layout';
import { MantineProvider } from '@mantine/core';
import AuthProvider from 'features/authentication/contexts/AuthProvider';
import ProtectedRoute from 'features/authentication/ProtectedRoute';
import ErrorPage from 'routes/ErrorElement';
import ArticlesPage from 'routes/ArticlesPage';
import ArticleLandingPage, {
  loader as landingArticleLoader
} from 'routes/ArticleLandingPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          {
            path: '/',
            element: <Root />,
            loader: articlesLoader
          },
          {
            path: '/basic-react-query',
            element: <BasicReactQuery />
          },
          {
            path: '/articles',
            element: <ArticlesPage />
          },
          {
            path: '/articles/:id',
            element: <ArticleLandingPage />,
            loader: landingArticleLoader
          },
          {
            path: '/profile',
            element: (
              <ProtectedRoute>
                <h1 className="mt-16">Profile</h1>
              </ProtectedRoute>
            )
          }
        ]
      }
    ]
  }
]);

const queryClient = new QueryClient();

function App() {
  return (
    <StrictMode>
      <MantineProvider forceColorScheme="dark">
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthProvider>
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}

export default App;
