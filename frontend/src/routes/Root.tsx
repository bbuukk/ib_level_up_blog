import {
  IsAuthorizedRequestStatus,
  useAuth
} from 'features/authentication/contexts/AuthProvider';
import './Root.scss';

import Article from 'types/Article';

import { axiosInstance } from 'utils/axios';
import { useLoaderData } from 'react-router-dom';

import FeaturedArticleCard from 'features/articles/FeaturedArticleCard';
import ArticleCard from 'features/articles/ArticleCard';

export async function articlesLoader() {
  const response = await axiosInstance({
    method: 'get',
    url: `/api/articles/?page=1&perPage=10`
  });

  return response.data;
}

interface ArticleResponse {
  data: Article[];
}

const Root = () => {
  const { isAuthorized } = useAuth();

  const articlesResponse = useLoaderData() as ArticleResponse;

  console.log(articlesResponse);
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
              <a href="#">All featured news</a>
            </div>
            <div className="featuredCardsList">
              {articlesResponse?.data?.slice(0, 3).map((a) => {
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
            <div className="articlesList">
              {articlesResponse?.data?.slice(3, 9).map((a) => {
                return (
                  <ArticleCard
                    key={`article-${a.id}`}
                    createdAt={a.created_at}
                    {...a}
                  />
                );
              })}
            </div>
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
      <div className="modal">
        <div className="modal__container">
          <div className="modal__heading">
            <h4>Modal text</h4>
            <div className="modal__close">
              <img
                src="/src/assets/images/close-modal-icon.svg"
                alt="Menu icon"
              />
            </div>
          </div>
          <div className="modal__content">
            <form action="" className="form--simple">
              <div className="inputBox">
                <label htmlFor="">Label</label>
                <input type="text" placeholder="Placeholder" />
                <p>Error</p>
              </div>
              <div className="inputBox">
                <label htmlFor="">Label</label>
                <input type="text" placeholder="Placeholder" />
                <p>Error</p>
              </div>
              <div className="inputBox">
                <label htmlFor="">Label</label>
                <input type="text" placeholder="Placeholder" />
                <p>Error</p>
              </div>
              <div className="inputBox">
                <label htmlFor="">Label</label>
                <input type="text" placeholder="Placeholder" />
                <p>Error</p>
              </div>
              <div className="form__buttonBox">
                <button className="button">Action</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Root;

