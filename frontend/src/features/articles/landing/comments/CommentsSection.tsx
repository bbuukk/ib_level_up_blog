import CommentComponent from './Comment';
import CommentForm from './CommentForm';

import useGetArticleComments from '../server/useGetArticleComments';

export const articleCommentsParams = {
  page: 1,
  sort: {
    created_at: 'desc' as const
  }
};

interface CommentsSectionProps {
  articleId: number;
}

//TODO: implement infinite loader on comments
const CommentsSection = ({ articleId }: CommentsSectionProps) => {
  const {
    data: comments,
    isLoading: isCommentLoading,
    error: commentsError
  } = useGetArticleComments(articleId, articleCommentsParams);

  if (isCommentLoading) {
    return <>Loading...</>;
  }

  if (commentsError) {
    return <>Error...</>;
  }

  return (
    <div className="comments">
      <div className="containerSmall--comments">
        <h3>Comments:</h3>
        <CommentForm articleId={articleId} />
        {comments?.data?.map((c) => {
          return <CommentComponent key={`comment-${c.id}`} {...c} />;
        })}
      </div>
    </div>
  );
};

export default CommentsSection;
