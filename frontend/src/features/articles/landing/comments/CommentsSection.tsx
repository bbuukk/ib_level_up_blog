import CommentComponent from './Comment';
import CommentForm from './CommentForm';

import Comment from 'types/ApiComment';

import { useState } from 'react';

interface CommentsSectionProps {
  articleId: number;
  comments?: Comment[];
}

const CommentsSection = ({
  articleId,
  comments: initialComments = []
}: CommentsSectionProps) => {
  const [comments, setComments] = useState(initialComments);

  return (
    <div className="comments">
      <div className="containerSmall--comments">
        <h3>Comments:</h3>
        <CommentForm articleId={articleId} setComments={setComments} />
        {comments?.map((c) => {
          return <CommentComponent key={`comment-${c.id}`} {...c} />;
        })}
      </div>
    </div>
  );
};

export default CommentsSection;
