import { QueryClient } from '@tanstack/react-query';
import { paginatedQueryParams } from 'features/articles/listing/TagSelect';
import { buildQueryOptions as getArticlesBuildQueryOptions } from 'features/articles/server/useGetArticles';

import { buildQueryOptions as getTagsBuildQueryOptions } from 'features/articles/server/useGetTags';
import { featuredArticlesQueryParams } from 'features/root/featuredNews';
import { defaultLatestArticlesQueryParams } from 'features/root/latestNews';

const loaderRoot = (queryClient: QueryClient) => async () => {
  queryClient.prefetchQuery(
    getArticlesBuildQueryOptions(featuredArticlesQueryParams)
  );
  queryClient.prefetchQuery(
    getArticlesBuildQueryOptions(defaultLatestArticlesQueryParams)
  );
  queryClient.prefetchQuery(getTagsBuildQueryOptions(paginatedQueryParams));

  return null;
};

export default loaderRoot;
