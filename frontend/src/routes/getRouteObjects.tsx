import { QueryClient } from '@tanstack/react-query';
import Layout from 'components/layout/Layout';
import loaderArticles from 'features/articles/server/loaderArticles';
import ProtectedRoute from 'features/authentication/ProtectedRoute';
import loaderMe from 'features/authentication/server/loaderMe';
import ArticlesPage from './ArticlesPage';
import BasicReactQuery from './BasicReactQuery';
import ErrorPage from './ErrorElement';
import PlaygroundPage from './PlaygroundPage';
import ProfilePage from './ProfilePage';
import Root from './root/Root';

import ArticleLandingPage from 'routes/ArticleLandingPage';

import ProfileEditPage from 'routes/ProfileEditPage';
import EditArticlePage from './EditArticlePage';
import loaderRoot from './root/loaderRoot';
import landingArticleLoader from 'features/articles/landing/server/loaderLandingArticle';
import loaderProfile from 'features/profile/server/loaderProfile';
import editCreateArticleLoader from 'features/articles/server/loaderEditCreateArticle';

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
              loader: landingArticleLoader(queryClient_)
            },
            {
              path: '/edit-article/:id?',
              element: <EditArticlePage />,
              loader: editCreateArticleLoader(queryClient_)
            },
            {
              path: '/profile',
              element: (
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              ),
              loader: loaderProfile(queryClient_)
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
