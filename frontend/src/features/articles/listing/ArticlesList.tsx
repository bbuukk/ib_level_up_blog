import './style.scss';

import ArticleCard from './ArticleCard';
import ApiArticle from 'types/ApiArticle';
import { PAGE_SIZE } from 'utils/constants';
import { Loader } from '@mantine/core';

import ApiPaginatedResponse from 'types/ApiPaginatedResponse';

interface ArticlesListProps {
  data?: ApiPaginatedResponse<ApiArticle>;
  isLoading: boolean;
  error: unknown;
}

//TODO: beauify error message and empty dataset message
const ArticlesList = ({ data, isLoading, error }: ArticlesListProps) => {
  if (data?.data.length === 0) {
    return <div>No articles found</div>;
  }

  if (error) {
    return <div>Error in results</div>;
  }

  if (isLoading) {
    return (
      <div className="articlesList">
        {Array.from({ length: PAGE_SIZE }, (_, index) => (
          <div className="articleSkeleton" key={`articleSkeleton-${index}`}>
            <Loader size={50} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="articlesList">
      {data?.data?.map((a) => {
        return <ArticleCard key={`article-${a.id}`} {...a} />;
      })}
    </div>
  );
};

export default ArticlesList;
