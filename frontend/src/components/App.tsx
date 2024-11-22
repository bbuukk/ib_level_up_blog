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
import ProtectedRoute from 'features/authentication/ProtectedRoute';
import ErrorPage from 'routes/ErrorElement';
import ArticlesPage from 'routes/ArticlesPage';
import ArticleLandingPage, {
  loader as landingArticleLoader
} from 'routes/ArticleLandingPage';
import { notifications, Notifications } from '@mantine/notifications';
import loaderArticles from 'features/articles/server/loaderArticles';
import loaderMe from 'features/authentication/server/loaderMe';
import ProfilePage from 'routes/ProfilePage';
import { isAxiosError } from 'axios';
import ProfileEditPage from 'routes/ProfileEditPage';

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      if (isAxiosError(error) && error.response?.status === 401) {
        // We don't want to show error notification if user is not logged in
        return;
      }
      notifications.show({
        title: 'Error',
        message: `Something went wrong: ${error.message}`,
        color: 'red'
      });
    }
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
                <ProfilePage />
              </ProtectedRoute>
            )
          },
          {
            path: '/profile/edit',
            element: (
              <ProtectedRoute>
                <ProfileEditPage />
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
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </MantineProvider>
    </StrictMode>
  );
}

export default App;
