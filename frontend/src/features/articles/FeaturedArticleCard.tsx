import CardContent from './CardContent';
import './style.scss';

import User from 'types/ApiUser';

interface ArticleCardProps {
  id: number;
  title: string;
  createdAt: string;
  author: User;
}

const FeaturedArticleCard = (articleProps: ArticleCardProps) => {
  const { id } = articleProps;
  return (
    <a href={`/articles/${id}`} className="featuredCard">
      <img
        className="featuredCard__image"
        src="https://picsum.photos/500/380"
      />
      <div className="featuredCard__overlay" />
      <div className="featuredCard__content">
        <div className="premiumFlag--featuredCard">
          <img className="" src="/src/assets/images/premium-icon.svg" />
        </div>
        <div className="tag--featuredCard">Design</div>
        <CardContent {...articleProps} />
      </div>
    </a>
  );
};

export default FeaturedArticleCard;
