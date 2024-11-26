import { QueryClient } from '@tanstack/react-query';
import { buildQueryOptions } from './useGetArticles';
import { LoaderFunctionArgs } from 'react-router-dom';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';

//TODO!?: if tehre is staleTime then all the articles in query will be only featured for time of stale?
const loader =
  (queryClient: QueryClient) =>
  // async ({ request, params }: LoaderFunctionArgs) => {
  async ({ request }: LoaderFunctionArgs) => {
    const url = new URL(request.url);
    //
    const tag = url.searchParams.get('tag');

    const queryOptions: ApiArticlesIndexRequestParams = {
      page: 1
    };

    if (tag) {
      queryOptions.tag = { label: tag };
    }

    const data = await queryClient.ensureQueryData(
      buildQueryOptions(queryOptions)
    );

    return data;
  };

export default loader;

// const perPage = url.searchParams.get('perPage') || '10';

// Or get all search params as an object
// const searchParams = Object.fromEntries(url.searchParams);
//
//TODO!: multiple tag selection needed?
// const tags = url.searchParams.getAll('tag');
// if (tags.length > 0) {
//   queryOptions.tag = tags.map((tag) => ({ label: tag }));
// }
