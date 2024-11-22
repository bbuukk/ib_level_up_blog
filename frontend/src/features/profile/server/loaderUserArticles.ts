import { QueryClient } from '@tanstack/react-query';
import { buildQueryOptions } from './useGetUserArticles';
import ApiUserAriticlesRequestParams from '../types/ApiUserArticlesRequestParams';

const loaderMe = (queryClient: QueryClient) => async () => {
  try {
    const apiUserArticlesRequestParams: ApiUserAriticlesRequestParams = {
      page: 1,
      filter: {
        authorId: userDetails?.id ?? undefined
      },
      sort: {
        created_at: 'desc'
      }
    };

    const data = await queryClient.ensureQueryData(
      buildQueryOptions(apiUserArticlesRequestParams)
    );
    return data;
  } catch (error) {
    return null;
  }
};

export default loaderMe;
