import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { buildQueryOptions as userBuildQueryOptions } from 'features/authentication/server/useGetMe';
import { buildQueryOptions as individualArticleBuildQueryOptions } from '../landing/server/useGetArticleById';

const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;

    if (id) {
      const articleId = parseInt(id, 10);

      queryClient.prefetchQuery(individualArticleBuildQueryOptions(articleId));
    }

    queryClient.prefetchQuery(userBuildQueryOptions());

    return null;
  };

export default loader;
