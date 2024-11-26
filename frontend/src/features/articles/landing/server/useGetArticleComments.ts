import { queryOptions, useQuery } from '@tanstack/react-query';
import ApiPaginatedRequestParams from 'types/ApiPaginatedRequestParams';
import { getArticleComments } from 'utils/axios';

import { SECOND } from 'utils/constants';

export const buildQueryOptions = (
  articleId: number,
  params: ApiPaginatedRequestParams
) => {
  return queryOptions({
    queryKey: ['comments', articleId, params],
    queryFn: () => getArticleComments(articleId, params),
    staleTime: 10 * SECOND
  });
};

const useGetArticleComments = (
  articleId: number,
  params: ApiPaginatedRequestParams
) => {
  const { data, isLoading, error } = useQuery(
    buildQueryOptions(articleId, params)
  );

  return { data, isLoading, error };
};

export default useGetArticleComments;
