import useGetMe from 'features/authentication/server/useGetMe';
import CardContent from './CardContent';
import './style.scss';

import { Link } from 'react-router-dom';
import ApiArticle from 'types/ApiArticle';

//TODO: fix, premium badge collapse with tags
const ArticleCard = (articleProps: ApiArticle) => {
  const { data: user } = useGetMe();
  const { id, author, cover_url: coverUrl } = articleProps;

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
        <Link to={`/edit-article/${id}`} className="articleCard__EditLink">
          🖊
        </Link>
      )}

      <div className="articleCard__imgBox">
        <img
          className="featuredCard__image"
          src={coverUrl}
          alt="article hero"
        />
      </div>
      <div className="articleCard__body">
        <CardContent {...articleProps} />
      </div>
    </a>
  );
};

export default ArticleCard;
