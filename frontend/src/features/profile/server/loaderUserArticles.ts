import { QueryClient } from '@tanstack/react-query';
import { buildQueryOptions } from './useGetUserArticles';
import ApiUserAriticlesRequestParams from '../types/ApiUserArticlesRequestParams';

const loaderRoot = (queryClient: QueryClient) => async () => {
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

    const [data1, data2, data3] = await Promise.all([
      ensureQueryData(queryClient, {
        queryKey: ['query1'],
        queryFn: fetchQuery1
      }),
      ensureQueryData(queryClient, {
        queryKey: ['query2'],
        queryFn: fetchQuery2
      }),
      ensureQueryData(queryClient, {
        queryKey: ['query3'],
        queryFn: fetchQuery3
      })
    ]);

    return data;
  } catch (error) {
    return null;
  }
};

export default loaderMe;
