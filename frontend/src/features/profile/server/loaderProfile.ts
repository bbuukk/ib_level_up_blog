import { QueryClient } from '@tanstack/react-query';
import { createUserArticlesParams } from '../ProfileContainer';
import { buildQueryOptions as userBuildQueryOptions } from 'features/authentication/server/useGetMe';
import { buildQueryOptions as userArticlesBuildQueryOptions } from 'features/articles/server/useGetArticles';

const loaderProfile = (queryClient: QueryClient) => async () => {
  const user = await queryClient.ensureQueryData(userBuildQueryOptions());

  queryClient.prefetchQuery(
    userArticlesBuildQueryOptions(createUserArticlesParams(user.id))
  );
  return null;
};

export default loaderProfile;
