import User from 'types/ApiUser';
import { formatDate } from 'utils/formatDate';
import { formatDateToTimeAgo } from 'utils/formatDateToTimeAgo'; // Assume you've put the function in this file

interface CommentProps {
  content: string;
  created_at: string;
  author?: User;
}

//TODO?: introduce default avatar photo (maybe just first letters of first name and second one)
const Comment = ({ created_at, content, author }: CommentProps) => {
  const formattedCreatedAt = formatDate(created_at);

  const timeAgoString = formatDateToTimeAgo(created_at);

  return (
    <div className="comment">
      <img
        className="comment__img"
        src={author?.avatar_url}
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
