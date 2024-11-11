import User from 'types/ApiUser';
import { formatDate } from 'utils/formatDate';
import { formatDateToTimeAgo } from 'utils/formatDateToTimeAgo'; // Assume you've put the function in this file

interface CommentProps {
  content: string;
  created_at: string;
  author?: User;
}

const Comment = ({ created_at, content, author }: CommentProps) => {
  const formattedCreatedAt = formatDate(created_at);

  const timeAgoString = formatDateToTimeAgo(created_at);

  return (
    <div className="comment">
      <img
        className="comment__img"
        src="https://picsum.photos/50/50"
        alt={`avatar of ${author?.name}`}
      />
      <div className="comment__content">
        <h5>{author?.name}</h5>
        <time
          dateTime={created_at}
        >{`${formattedCreatedAt} - ${timeAgoString}`}</time>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default Comment;
