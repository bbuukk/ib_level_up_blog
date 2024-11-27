import useGetMe from 'features/authentication/server/useGetMe';
import './ProfileContainer.scss';
import ArticlesList from 'features/articles/listing/ArticlesList';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import useGetArticles from 'features/articles/server/useGetArticles';
import SortBySelect from 'features/articles/listing/SortBySelect';

export const createUserArticlesParams = (
  id: number
): ApiArticlesIndexRequestParams => {
  return {
    page: 1,
    filter: {
      authorId: id
    },
    sort: {
      created_at: 'desc'
    }
  };
};

const ProfileContainer = () => {
  const navigate = useNavigate();

  //TODO: use isLoading
  const { data: userDetails, error: userDetailsErr } = useGetMe();

  const [params, setParams] = useState<ApiArticlesIndexRequestParams>(
    createUserArticlesParams(userDetails?.id as number)
  );

  const handlePageChange = (page: number) => {
    setParams({
      ...params,
      page
    });
  };

  //TODO: use isLoading
  const { data, isLoading, error } = useGetArticles(params);

  if (userDetailsErr) {
    return 'todo';
  }

  if (error) {
    return 'todo';
  }

  const defaultAvatarUrl = 'https://picsum.photos/200/200';
  return (
    <main>
      <section className="profileHero">
        <div className="container--profileHero">
          <div className="profileHero__left">
            <h1>
              Welcome, <span>{userDetails?.name}</span>
            </h1>
            <ul>
              <li>
                <Link to="/profile/edit">{`Edit profile -> `}</Link>
              </li>
              <li>
                <Link to="">{`Edit subscription -> `}</Link>
              </li>
            </ul>
          </div>
          <div className="profileHeroImage">
            <img
              className="profileHeroImage__image"
              src={userDetails?.avatar_url ?? defaultAvatarUrl}
              alt="user avatar"
            />
          </div>
        </div>
      </section>
      <button
        className="button--primary mt-10"
        onClick={() => navigate('/edit-article')}
      >
        Create new post
      </button>

      {/* TODO: if there is no articles, should not be shown*/}
      <div className="articlesListSort">
        <p>
          Showing <span>{data?.to}</span> / <span>{data?.total}</span>
        </p>
        <SortBySelect params={params} setParams={setParams} />
      </div>

      <ArticlesList data={data} isLoading={isLoading} error={error} />

      {/* TODO: if there is only one page of articles, should not be shown*/}
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
