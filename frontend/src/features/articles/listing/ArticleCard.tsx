import useGetMe from 'features/authentication/server/useGetMe';
import CardContent from './CardContent';
import './style.scss';

import User from 'types/ApiUser';
import { Link, useNavigate } from 'react-router-dom';

interface ArticleCardProps {
  id: number;
  title: string;
  createdAt: string;
  author?: User;
}

const ArticleCard = (articleProps: ArticleCardProps) => {
  const navigate = useNavigate();

  const { data: user } = useGetMe();
  const { id, author } = articleProps;

  const handleEditClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/edit-article/${id}`);
  };

  return (
    <a href={`/articles/${id}`} className="articleCard">
      {true && (
        <div className="premiumFlag--articleCard">
          <img
            className=""
            src="src/assets/images/premium-icon.svg"
            alt="premium article badge"
          />
        </div>
      )}
      {user?.id === author?.id && (
        <button onClick={handleEditClick} className="articleCard__EditLink">
          🖊
        </button>
      )}

      <div className="articleCard__imgBox">
        <img
          className="featuredCard__image"
          src="https://picsum.photos/500/380"
          alt="article hero"
        />
      </div>
      <div className="articleCard__body">
        <div className="tag--articleCard">Design</div>
        <CardContent {...articleProps} />
      </div>
    </a>
  );
};

export default ArticleCard;
