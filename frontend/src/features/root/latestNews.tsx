import useGetArticles from 'features/articles/server/useGetArticles';

import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import { useState } from 'react';
import TagSelect from 'features/articles/listing/TagSelect';
import ArticlesList from 'features/articles/listing/ArticlesList';
import { Link } from 'react-router-dom';

export const defaultLatestArticlesQueryParams = {
  page: 1,
  sort: { created_at: 'desc' as const }
};

const LatestNews = () => {
  const [latestArticlesQueryParams, setLatestArticlesQueryParams] =
    useState<ApiArticlesIndexRequestParams>(defaultLatestArticlesQueryParams);

  const {
    data: latestArticles,
    isLoading: isLatestArticlesLoading,
    error: latestArticlesError
  } = useGetArticles(latestArticlesQueryParams);

  if (latestArticlesError) {
    return <div>{`Error loading`}</div>;
  }

  //TODO: test ui with many tags
  return (
    <section className="latestNews">
      <div className="container--latestNews">
        <div className="latestNews__header">
          <div className="latestNews__heading">
            <h3>Latest news</h3>
            <div className="divider--latestNews" />
            <p>
              Donec non massa auctor, dictum ante eu, ultrices eros. Sed sit
              amet augue nec diam tempor placerat.
            </p>
          </div>
          <TagSelect
            params={latestArticlesQueryParams}
            setParams={setLatestArticlesQueryParams}
          />
        </div>
        <ArticlesList
          data={latestArticles}
          isLoading={isLatestArticlesLoading}
          error={latestArticlesError}
        />
        <div className="latestNews__link">
          <Link to="/articles" className="button--latestNews">
            News page
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestNews;
