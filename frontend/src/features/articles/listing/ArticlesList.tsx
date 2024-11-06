import './style.scss';

import ArticleCard from './ArticleCard';

import ApiArticle from 'types/ApiArticle';

import useGetArticles from '../server/useGetArticles';
import SearchParams from '../types/SearchParams';

interface ArticlesListProps {
  searchParams: SearchParams;
}

const ArticlesList = ({ searchParams }: ArticlesListProps) => {
  const { data, isLoading, error } = useGetArticles(searchParams);

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
