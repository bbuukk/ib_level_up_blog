import {
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
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
import { notifications, Notifications } from '@mantine/notifications';
import loaderArticles from 'features/articles/server/loaderArticles';
import loaderMe from 'features/authentication/server/loaderMe';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) =>
      notifications.show({
        title: 'Error',
        message: `Something went wrong: ${error.message}`,
        color: 'red'
      })
  })
});

const router = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: <ErrorPage />,
    loader: loaderMe(queryClient),
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
            element: <ArticlesPage />,
            loader: loaderArticles(queryClient)
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

function App() {
  return (
    <StrictMode>
      <MantineProvider forceColorScheme="dark">
        <Notifications />
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
