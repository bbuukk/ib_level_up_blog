import './style.scss';

import useGetArticles from '../server/useGetArticles';
import ArticlesList from './ArticlesList';
import { useState } from 'react';
// import SearchParams from '../types/SearchParams';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import { useForm } from '@mantine/form';
import { TextInput } from '@mantine/core';

import { useSearchParams } from 'react-router-dom';

const ArticlesContainer = () => {
  //TODO!: fix variables names
  const [sParams, setSParams] = useSearchParams();

  const [searchParams, setSearchParams] =
    useState<ApiArticlesIndexRequestParams>(() => {
      const tag: string | null = sParams.get('tag');
      return {
        page: 1,
        ...(tag && { tag: { label: tag } })
      };
    });

  const { data, isLoading, error } = useGetArticles(searchParams);

  const searchKeyWordForm = useForm<{ searchKeyword: string }>({
    initialValues: {
      searchKeyword: ''
    }
  });

  const handlSearchKeywordForm = ({
    searchKeyword
  }: {
    searchKeyword: string;
  }) => {
    setSearchParams({
      page: 1,
      search: searchKeyword ? searchKeyword : undefined
    });
  };

  const handlePageChange = (page: number) => {
    setSearchParams({
      ...searchParams,
      page
    });
  };

  return (
    <main>
      <section className="articlesHero">
        <div className="container--articlesHero">
          <h1>Articles</h1>
        </div>
      </section>

      <section className="articlesPageList">
        <div className="container--articlesPageList">
          <div className="articlesListHeading">
            <form
              className="searchArticlesForm"
              onSubmit={searchKeyWordForm.onSubmit(handlSearchKeywordForm)}
            >
              <TextInput
                {...searchKeyWordForm.getInputProps('searchKeyword')}
                placeholder="Search by keyword..."
                mr="sm"
              />
            </form>
            <nav>
              <ul className="listTabs">
                <li className="tag--tabActive">All</li>
                <li className="tag--tab">AI</li>
                <li className="tag--tab">Design</li>
                <li className="tag--tab">Programming</li>
              </ul>
            </nav>
          </div>
          <div className="articlesListSort">
            <p>
              Showing <span>10</span> / <span>30</span>
            </p>
            <div>
              <label htmlFor="sort">Sort by:</label>
              <select name="sort" id="sort">
                <option value="">ASC</option>
                <option value="">DES</option>
              </select>
            </div>
          </div>

          <ArticlesList data={data} isLoading={isLoading} error={error} />

          <nav className="pagination">
            <ul className="pagination__list">
              {Array.from(
                { length: data?.last_page as number },
                (_, index) => index + 1
              ).map((page) => (
                <li
                  className={`pagination__item ${
                    searchParams.page === page ? 'pagination__item--active' : ''
                  }`}
                  key={page}
                  onClick={() => handlePageChange(page)}
                >
                  <span>{page}</span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
};

export default ArticlesContainer;
