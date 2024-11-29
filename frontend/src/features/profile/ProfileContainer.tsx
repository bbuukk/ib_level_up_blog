import useGetMe from 'features/authentication/server/useGetMe';
import './ProfileContainer.scss';
import ArticlesList from 'features/articles/listing/ArticlesList';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import useGetArticles from 'features/articles/server/useGetArticles';
import SortBySelect from 'features/articles/listing/SortBySelect';
import Pagination from 'features/articles/listing/Pagination';

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
  const {
    data: userDetails,
    isLoading: isUserLoading,
    error: userDetailsError
  } = useGetMe();

  const [params, setParams] = useState<ApiArticlesIndexRequestParams>(
    createUserArticlesParams(userDetails?.id as number)
  );

  const {
    data: articlesData,
    isLoading: isArticlesLoading,
    error: articlesError
  } = useGetArticles(params);

  if (isUserLoading || isArticlesLoading) {
    return <div>Loading...</div>;
  }

  if (userDetailsError) {
    return <div>Error loading user details: {userDetailsError.message}</div>;
  }

  if (articlesError) {
    return <div>Error loading articles: {articlesError.message}</div>;
  }

  return (
    <main className="profile">
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
              src={userDetails?.avatar_url ?? 'src/assets/logo.svg'}
              alt="user avatar"
            />
          </div>
        </div>
      </section>

      <Link className="profile__createNewPostBtn" to="/edit-article">
        Create new post
      </Link>
      {/* TODO: if there is no articles, should not be shown*/}
      <div className="profile__articlesListSort">
        <p>
          Showing <span>{articlesData?.to}</span> /{' '}
          <span>{articlesData?.total}</span>
        </p>
        <SortBySelect params={params} setParams={setParams} />
      </div>

      <ArticlesList
        data={articlesData}
        isLoading={isArticlesLoading}
        error={articlesError}
      />

      {/* TODO: if there is only one page of articles, should not be shown*/}
      <Pagination data={articlesData} params={params} setParams={setParams} />
    </main>
  );
};

export default ProfileContainer;
