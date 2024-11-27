import ApiArticle from 'types/ApiArticle';
import CardContent from './CardContent';
import './style.scss';

const FeaturedArticleCard = (articleProps: ApiArticle) => {
  const { id, cover_url: coverUrl } = articleProps;
  return (
    <a href={`/articles/${id}`} className="featuredCard">
      <img className="featuredCard__image" src={coverUrl} />
      <div className="featuredCard__overlay" />
      <div className="featuredCard__content">
        <div className="premiumFlag--featuredCard">
          <img className="" src="/src/assets/images/premium-icon.svg" />
        </div>
        <CardContent {...articleProps} />
      </div>
    </a>
  );
};

export default FeaturedArticleCard;
