import { QueryClient } from '@tanstack/react-query';
import { buildQueryOptions } from './useGetArticles';
import { LoaderFunctionArgs } from 'react-router-dom';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';

const loader =
  (queryClient: QueryClient) =>
  async ({ request }: LoaderFunctionArgs) => {
    const queryOptions: ApiArticlesIndexRequestParams = {
      page: 1
    };

    const url = new URL(request.url);
    const tag = url.searchParams.get('tag');

    if (tag) {
      queryOptions.tag = { label: tag };
    }

    queryClient.prefetchQuery(buildQueryOptions(queryOptions));

    return null;
  };

export default loader;
