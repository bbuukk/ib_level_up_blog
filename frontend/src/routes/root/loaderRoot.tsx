import { QueryClient } from '@tanstack/react-query';
import { buildQueryOptions as getArticlesBuildQueryOptions } from 'features/articles/server/useGetArticles';
import {
  defaultPaginatedQueryParams,
  featuredArticlesQueryParams,
  latestArticlesQueryParams
} from './Root';
import { buildQueryOptions as getTagsBuildQueryOptions } from 'features/articles/server/useGetTags';

//TODO!: put this in merge request
//it is better to use prefetchQuery,
//than ensureQueryData to let page
//render without waiting for all queries succeed
const loaderRoot = (queryClient: QueryClient) => async () => {
  queryClient.prefetchQuery(
    getArticlesBuildQueryOptions(featuredArticlesQueryParams)
  );
  queryClient.prefetchQuery(
    getArticlesBuildQueryOptions(latestArticlesQueryParams)
  );
  queryClient.prefetchQuery(
    getTagsBuildQueryOptions(defaultPaginatedQueryParams)
  );

  return null;
};

export default loaderRoot;
