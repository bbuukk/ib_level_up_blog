import { queryOptions, useQuery } from '@tanstack/react-query';
import { getArticles } from 'utils/axios';

import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import { SECOND } from 'utils/constants';

//TODO?: introduce dynamic stale time?
export const buildQueryOptions = (params: ApiArticlesIndexRequestParams) => {
  return queryOptions({
    queryKey: ['articles', params],
    queryFn: () => getArticles(params),
    staleTime: 20 * SECOND
  });
};

const useGetArticles = (params: ApiArticlesIndexRequestParams) => {
  const { data, isLoading, error } = useQuery(buildQueryOptions(params));

  return { data, isLoading, error };
};

export default useGetArticles;
