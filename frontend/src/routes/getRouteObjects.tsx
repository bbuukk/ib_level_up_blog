import { QueryClient } from '@tanstack/react-query';
import Layout from 'components/Layout';
import loaderArticles from 'features/articles/server/loaderArticles';
import ProtectedRoute from 'features/authentication/ProtectedRoute';
import loaderMe from 'features/authentication/server/loaderMe';
import ArticlesPage from './ArticlesPage';
import BasicReactQuery from './BasicReactQuery';
import ErrorPage from './ErrorElement';
import PlaygroundPage from './PlaygroundPage';
import ProfilePage from './ProfilePage';
import Root from './root/Root';

import ArticleLandingPage, {
  loader as landingArticleLoader
} from 'routes/ArticleLandingPage';

import ProfileEditPage from 'routes/ProfileEditPage';
import EditArticlePage from './EditArticlePage';
import loaderRoot from './root/loaderRoot';

//TODO!: implement mobile view for all the routes
const getRouteObjects = (queryClient_: QueryClient) => {
  return [
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      loader: loaderMe(queryClient_),
      children: [
        {
          errorElement: <ErrorPage />,
          children: [
            {
              path: '/',
              element: <Root />,
              loader: loaderRoot(queryClient_)
            },
            {
              path: '/basic-react-query',
              element: <BasicReactQuery />
            },
            {
              path: '/articles',
              element: <ArticlesPage />,
              loader: loaderArticles(queryClient_)
            },
            {
              path: '/articles/:id',
              element: <ArticleLandingPage />,
              loader: landingArticleLoader
            },
            {
              path: '/edit-article/:id?',
              element: <EditArticlePage />
            },
            {
              // About data fetching and mutations: You should use React Query (RQ) for your queries and mutations, and add React Router’s (RR) data loaders to the pages and connect them to RQ.
              // TODO!: introduce loader for user articles
              path: '/profile',
              element: (
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              )
              // loader: loaderArticles(queryClient, userId)
            },
            {
              path: '/profile/edit',
              element: (
                <ProtectedRoute>
                  <ProfileEditPage />
                </ProtectedRoute>
              )
            },
            {
              path: '/playground',
              element: <PlaygroundPage />
            }
          ]
        }
      ]
    }
  ];
};

export default getRouteObjects;
