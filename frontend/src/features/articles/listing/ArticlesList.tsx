import './style.scss';

import ArticleCard from './ArticleCard';
import ApiArticle from 'types/ApiArticle';

interface ArticlesListProps {
  data:
    | {
        data: ApiArticle[];
      }
    | undefined;
  isLoading: boolean;
  error: unknown;
}

const ArticlesList = ({ data, isLoading, error }: ArticlesListProps) => {
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (data?.data.length === 0) {
    return <div>No articles found</div>;
  }

  if (error) {
    return <div>Error in results</div>;
  }
  return (
    <div className="articlesList">
      {data?.data.map((a: ApiArticle) => {
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
