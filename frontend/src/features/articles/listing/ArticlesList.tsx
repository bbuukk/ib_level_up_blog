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

//TODO: beauify error message
const ArticlesList = ({ data, isLoading, error }: ArticlesListProps) => {
  if (error) {
    return <div>Error in results</div>;
  }

  if (data?.data.length === 0) {
    return (
      <div className="articlesList--empty">
        <figure className="articlesList__figure">
          <img
            className="articlesList__image"
            src="/src/assets/images/no_articles_found.svg"
            alt="No articles found"
          ></img>
          <figcaption className="articlesList__caption">
            No results found
          </figcaption>
        </figure>
      </div>
    );
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
