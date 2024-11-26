import { queryOptions, useQuery } from '@tanstack/react-query';
import { getArticles } from 'utils/axios';

import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';

export const buildQueryOptions = (params: ApiArticlesIndexRequestParams) => {
  return queryOptions({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params),
    staleTime: 1000 * 20
  });
};

const useGetArticles = (params: ApiArticlesIndexRequestParams) => {
  const { data, isLoading, error } = useQuery(buildQueryOptions(params));

  // We could go like this, but we'd endup with duplicated notifications
  /*   useEffect(() => {
    if (error) {
      console.log('Error in request');
    }
  }, [error]);
 */
  return { data, isLoading, error };
};

export default useGetArticles;
