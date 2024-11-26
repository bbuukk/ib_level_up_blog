import { queryOptions, useQuery } from '@tanstack/react-query';
import { getArticleById } from 'utils/axios';

import { MINUTE } from 'utils/constants';

export const buildQueryOptions = (id?: number) => {
  return queryOptions({
    queryKey: ['article', id],
    queryFn: () => getArticleById(id),
    staleTime: MINUTE,
    enabled: !!id
  });
};

const useGetArticleByid = (id?: number) => {
  const { data, isLoading, error } = useQuery(buildQueryOptions(id));

  return { data, isLoading, error };
};

export default useGetArticleByid;
