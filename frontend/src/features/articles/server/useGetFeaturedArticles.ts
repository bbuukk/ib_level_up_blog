// import { queryOptions, useQuery } from '@tanstack/react-query';
// import { getArticles } from 'utils/axios';
//
// import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
// import { MINUTE } from 'utils/constants';
//
// export const buildQueryOptions = (params: ApiArticlesIndexRequestParams) => {
//   //TODO?: put tag=featured in params?
//
//   return queryOptions({
//     queryKey: ['featuredArticles', params],
//     queryFn: () => getArticles(params),
//     staleTime: 20 * MINUTE
//   });
// };
//
// const useGetFeaturedArticles = (params: ApiArticlesIndexRequestParams) => {
//   const { data, isLoading, error } = useQuery(buildQueryOptions(params));
//
//   return { data, isLoading, error };
// };
//
// export default useGetFeaturedArticles;
