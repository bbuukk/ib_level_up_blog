import useGetMe from 'features/authentication/server/useGetMe';
import './ProfileContainer.scss';
import ProfileHero from './ProfileHero';
import ArticlesList from 'features/articles/listing/ArticlesList';
import { useState } from 'react';
import useGetUserArticles from './server/useGetUserArticles';
import ApiUserAriticlesRequestParams from './types/ApiUserArticlesRequestParams';

const ProfileContainer = () => {
  //TODO: isLoading!
  const { data: userDetails, error: userDetailsErr } = useGetMe();

  const [params, setParams] = useState<ApiUserAriticlesRequestParams>({
    page: 1,
    filter: {
      authorId: userDetails?.id || 0 //TODO! fix
    },
    sort: {
      created_at: 'desc'
    }
  });

  const handlePageChange = (page: number) => {
    setParams({
      ...params,
      page
    });
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setParams((prevParams) => ({
      ...prevParams,
      sort: {
        created_at: event.target.value as 'asc' | 'desc'
      }
    }));
  };

  //TODO: isLoading!
  const { data, isLoading, error } = useGetUserArticles(params);

  if (userDetailsErr) {
    return 'todo';
  }

  if (error) {
    return 'todo';
  }

  return (
    <main>
      <ProfileHero {...userDetails} />
      {/* TODO: make this compoennt reusable, use in articlesPage and here*/}
      <div className="articlesListSort">
        <p>
          Showing <span>{data?.to}</span> / <span>{data?.total}</span>
        </p>
        <div>
          <label htmlFor="sort">Sort by:</label>
          <select
            name="sort"
            id="sort"
            value={params.sort?.created_at}
            onChange={handleSortChange}
          >
            <option value="asc">Oldest</option>
            <option value="desc">Newest</option>
          </select>
        </div>
      </div>
      <section className="articlesPageList">
        <ArticlesList data={data} isLoading={isLoading} error={error} />
      </section>

      {/* TODO!: make this compoennt reusable, use in articlesPage and here*/}
      {/* TODO?: if there is only one page of articles. should pagination be loaded?*/}
      <nav className="pagination">
        <ul className="pagination__list">
          {Array.from(
            { length: data?.last_page as number },
            (_, index) => index + 1
          ).map((page) => (
            <li
              className={`pagination__item ${
                params.page === page ? 'pagination__item--active' : ''
              }`}
              key={page}
              onClick={() => handlePageChange(page)}
            >
              <span>{page}</span>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
};

export default ProfileContainer;
