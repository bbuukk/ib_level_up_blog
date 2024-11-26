import IsAuthorizedRequestStatus from 'features/authentication/types/IsAuthorizedRequestStatus';
import './Root.scss';
import useNewAuth from 'features/authentication/server/useNewAuth';

import Article from 'types/ApiArticle';

import FeaturedArticleCard from 'features/articles/listing/FeaturedArticleCard';
import ArticleCard from 'features/articles/listing/ArticleCard';

import { queryOptions, QueryClient, useQuery } from '@tanstack/react-query';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import { getArticles } from 'utils/axios';

// const params: ApiArticlesIndexRequestParams = {
//   page: 1,
//   sort: { created_at: 'desc' },
//   filter: { authorId: 5 },
//   tag: { label: 'featured' }
// };

export const buildQueryOptions = (params: ApiArticlesIndexRequestParams) => {
  return queryOptions({
    queryKey: ['featured-articles', params],
    queryFn: () => getArticles(params),
    staleTime: 10 * 1000
  });
};

export const loader = (queryClient: QueryClient) => async () => {
  const data = await queryClient.ensureQueryData(
    buildQueryOptions({ ...featuredArticlesQueryParams })
  );
  return data;
};

//TODO: introduce stale time for featured a
const featuredArticlesQueryParams = {
  page: 1,
  // //TODO why does it break type system?
  // sort: { created_at: 'desc' },
  tag: { label: 'featured' }
};

const latestArticlesQueryParams = {
  page: 1,
  // //TODO why does it break type system?
  // sort: { created_at: 'desc' },
  tag: { label: 'featured' }
};

// interface ArticleResponse {
//   data: Article[];
// }

// interface ArticlesListProps {
//   data:
//     | {
//         data: Article[];
//       }
//     | undefined;
//   isLoading: boolean;
//   error: unknown;
// }

const Root = () => {
  //TODO: use isLoading and error
  const { data: featuredArticles } = useQuery(
    buildQueryOptions(featuredArticlesQueryParams)
  );

  console.log(featuredArticles);

  const isAuthorized = useNewAuth();

  // const articlesResponse = useLoaderData() as ArticleResponse;

  return (
    <>
      <main>
        <article>
          {isAuthorized === IsAuthorizedRequestStatus.AUTHORIZED
            ? 'Authorized'
            : 'Not Authorized'}
        </article>
        <section className="hero">
          <article className="container--hero">
            <h1>
              Lorem ipsum dolor <span>sit amet</span>
            </h1>
            <div className="divider" />
            <p>
              Donec non massa auctor, dictum ante eu, ultrices eros. Sed sit
              amet augue nec diam tempor placerat. Integer dignissim lacinia
              turpis.
            </p>
          </article>
        </section>
        <section className="featuredNews">
          <div className="container--featuredNews">
            <div className="featuredNews__heading">
              <h2>Featured news</h2>
              <a href="/articles?tag=featured">All featured news</a>
            </div>
            <div className="featuredCardsList">
              {featuredArticles?.data?.slice(0, 3).map((a: Article) => {
                return (
                  <FeaturedArticleCard
                    key={`article-${a.id}`}
                    createdAt={a.created_at}
                    {...a}
                  />
                );
              })}
            </div>
          </div>
        </section>
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
              <nav>
                <ul className="listTabs">
                  <li className="tag--tabActive">All</li>
                  <li className="tag--tab">AI</li>
                  <li className="tag--tab">Design</li>
                  <li className="tag--tab">Programming</li>
                </ul>
              </nav>
            </div>
            <div className="articlesList"></div>
            <div className="latestNews__link">
              <a href="" className="button--latestNews">
                News page
              </a>
            </div>
          </div>
        </section>
      </main>
      <section className="premiumBanner">
        <div className="container--premiumBanner">
          <h3 className="premiumBanner__title">
            Start <span>premium</span> membership
          </h3>
          <p className="premiumBanner__text">
            Quisque a tincidunt tellus, sed auctor odio. Nullam fringilla purus
            quis augue tincidunt ultrices. Nunc vitae malesuada nisi, nec
            eleifend ante.
          </p>
          <a href="" className="button--premiumBanner">
            Start premium
          </a>
        </div>
      </section>
      <footer className="footer">
        <article className="container--footer">
          <h3>Follow us on social media</h3>
          <ul className="footer__list">
            <li className="footer__item">
              <a href="#">
                <img
                  src="/src/assets/images/facebook-logo.svg"
                  alt="Facebook logo"
                />
              </a>
            </li>
            <li className="footer__item">
              <a href="#">
                <img
                  src="/src/assets/images/twitter-logo.svg"
                  alt="Twitter logo"
                />
              </a>
            </li>
            <li className="footer__item">
              <a href="#">
                <img
                  src="/src/assets/images/pinterest-logo.svg"
                  alt="Pinterest logo"
                />
              </a>
            </li>
            <li className="footer__item">
              <a href="#">
                <img
                  src="/src/assets/images/behance-logo.svg"
                  alt="Behance logo"
                />
              </a>
            </li>
          </ul>
        </article>
      </footer>
    </>
  );
};

export default Root;

// {articlesResponse?.data?.slice(3, 9).map((a) => {
//   return (
//     <ArticleCard
//       key={`article-${a.id}`}
//       createdAt={a.created_at}
//       {...a}
//     />
//   );
// })}
