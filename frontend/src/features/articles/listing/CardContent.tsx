import './style.scss';

import ApiArticle from 'types/ApiArticle';

const CardContent = ({
  title,
  created_at: createdAt,
  author,
  tags
}: ApiArticle) => {
  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      <div className="cardContent__tags">
        {tags?.slice(0, 2).map((t) => {
          //TODO!: add elipsis, if tags are more than than that...
          return (
            <div className="tag" key={`article-${title}-tag-${t.label}`}>
              {t.label}
            </div>
          );
        })}
      </div>
      <div className="cardContent--featuredCard">
        <p className="cardContent__date">{formattedDate}</p>
        <h3 className="cardContent__title">{title}</h3>
        <p className="cardContent__author">{`By: ${author?.name}`}</p>
      </div>
    </>
  );
};

export default CardContent;
