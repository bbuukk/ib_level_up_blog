import './style.scss';

import useGetArticles from '../server/useGetArticles';
import ArticlesList from './ArticlesList';
import { useState } from 'react';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';

import { useSearchParams } from 'react-router-dom';
import TagSelect from './TagSelect';
import Pagination from './Pagination';
import SortBySelect from './SortBySelect';
import Search from './Search';

const ArticlesContainer = () => {
  const [urlParam] = useSearchParams();

  const [searchParams, setSearchParams] =
    useState<ApiArticlesIndexRequestParams>(() => {
      const tag: string | null = urlParam.get('tag');
      return {
        page: 1,
        ...(tag && { tag: { label: tag } })
      };
    });

  const {
    data: articles,
    isLoading: isArticlesLoading,
    error: articlesError
  } = useGetArticles(searchParams);

  return (
    <main>
      <section className="articlesHero">
        <div className="container--articlesHero">
          <h1>Articles</h1>
        </div>
      </section>

      <section className="articlesPageList">
        {/* TODO: if there is no articles, should not be show*/}
        <div className="container--articlesPageList">
          <div className="articlesListHeading">
            <Search params={searchParams} setParams={setSearchParams} />
            <TagSelect params={searchParams} setParams={setSearchParams} />
          </div>
          <div className="articlesListSort">
            <p>
              {articles ? (
                <>
                  Showing <span>{articles?.to}</span> /{' '}
                  <span>{articles?.total}</span>
                </>
              ) : (
                'Loading...'
              )}
            </p>
            <SortBySelect params={searchParams} setParams={setSearchParams} />
          </div>

          <ArticlesList
            data={articles}
            isLoading={isArticlesLoading}
            error={articlesError}
          />

          <Pagination
            data={articles}
            params={searchParams}
            setParams={setSearchParams}
          />
        </div>
      </section>
    </main>
  );
};

export default ArticlesContainer;
