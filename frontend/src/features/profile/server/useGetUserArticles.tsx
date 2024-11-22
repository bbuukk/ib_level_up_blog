import { queryOptions, useQuery } from '@tanstack/react-query';
import { getUserArticles } from 'utils/axios';
import Params from '../types/ApiUserArticlesRequestParams';

export const buildQueryOptions = (params: Params) => {
  return queryOptions({
    queryKey: ['user-articles', params],
    queryFn: () => getUserArticles(params)
    // staleTime: 1000 * 20
    //TODO?: introduce stale time?
  });
};

const useGetUserArticles = (params: Params) => {
  const { data, isLoading, error } = useQuery(buildQueryOptions(params));

  return { data, isLoading, error };
};

export default useGetUserArticles;
