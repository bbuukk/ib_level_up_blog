import { queryOptions, useQuery } from '@tanstack/react-query';
import { getTags } from 'utils/axios';

import ApiPaginatedRequestParams from 'types/ApiPaginatedRequestParams';

import { HOUR } from 'utils/constants';

export const buildQueryOptions = (params: ApiPaginatedRequestParams) => {
  return queryOptions({
    queryKey: ['tags', params],
    queryFn: () => getTags(params),
    staleTime: HOUR
  });
};

const useGetTags = (params: ApiPaginatedRequestParams) => {
  const { data, isLoading, error } = useQuery(buildQueryOptions(params));

  return { data, isLoading, error };
};

export default useGetTags;
