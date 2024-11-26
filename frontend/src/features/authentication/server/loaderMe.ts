import { QueryClient } from '@tanstack/react-query';
import { buildQueryOptions } from './useGetMe';

const loaderMe = (queryClient: QueryClient) => async () => {
  queryClient.prefetchQuery(buildQueryOptions());

  return null;
};

export default loaderMe;


