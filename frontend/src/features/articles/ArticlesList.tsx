import './style.scss';


import ArticleCard from './ArticleCard';

const ArticlesList = ({ articles }) => {

  return (
    <div className="articlesList">
      {articles?.map((a: Article) => {
        return (
          <ArticleCard
            key={`article-${a.id}`}
            createdAt={a.created_at}
            {...a}
          />
        );
      })}
    </div>
  );
};

export default ArticlesList;
