import { LoaderFunctionArgs } from 'react-router-dom';
import { QueryClient } from '@tanstack/react-query';
import { buildQueryOptions as landingArticleBuildQueryOptions } from './useGetArticleById';
import { buildQueryOptions as userArticlesBuildQueryOptions } from 'features/articles/server/useGetArticles';
import { buildQueryOptions as articleCommentsBuildQueryOptions } from './useGetArticleComments';
import { articleCommentsParams } from '../comments/CommentsSection';

export const createRelatedUserArticlesParams = (id: number) => {
  return {
    page: 1,
    filter: {
      authorId: id
    },
    sort: {
      created_at: 'desc' as const
    }
  };
};

const loader =
  (queryClient: QueryClient) =>
  async ({ params }: LoaderFunctionArgs) => {
    const { id } = params;

    if (id) {
      const articleId = parseInt(id, 10);

      queryClient.prefetchQuery(landingArticleBuildQueryOptions(articleId));

      queryClient.prefetchQuery(
        userArticlesBuildQueryOptions(
          createRelatedUserArticlesParams(articleId)
        )
      );

      queryClient.prefetchQuery(
        articleCommentsBuildQueryOptions(articleId, articleCommentsParams)
      );
    }

    return null;
  };

export default loader;
