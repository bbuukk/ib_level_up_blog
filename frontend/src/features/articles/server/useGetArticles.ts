import { queryOptions, useQuery } from '@tanstack/react-query';
import { getArticles } from 'utils/axios';

import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';

//TODO?: introduce dynamic stale time (set it in run)?
export const buildQueryOptions = (params: ApiArticlesIndexRequestParams) => {
  return queryOptions({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params),
    staleTime: 1000 * 20
  });
};

const useGetArticles = (params: ApiArticlesIndexRequestParams) => {
  const { data, isLoading, error } = useQuery(buildQueryOptions(params));

  return { data, isLoading, error };
};

export default useGetArticles;
