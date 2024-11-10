import './style.scss';

import User from 'types/ApiUser';

interface ArticleCardProps {
  title: string;
  createdAt: string;
  author: User;
}

const CardContent = ({ title, createdAt, author }: ArticleCardProps) => {
  const date = new Date(createdAt);

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="cardContent--featuredCard">
      <p className="cardContent__date">{formattedDate}</p>
      <h3 className="cardContent__title">{title}</h3>
      <p className="cardContent__author">{`By: ${author.name}`}</p>
    </div>
  );
};

export default CardContent;
