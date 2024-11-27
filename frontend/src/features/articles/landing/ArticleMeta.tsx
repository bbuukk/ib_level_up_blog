import { createRelatedUserArticlesParams } from 'features/articles/landing/server/loaderLandingArticle';
import useGetArticles from 'features/articles/server/useGetArticles';
import { Link } from 'react-router-dom';
import ApiUser from 'types/ApiUser';

//TODO?: intoroduce look if authro is null (but author should always be present)
const ArticleMeta = ({ author }: { author?: ApiUser }) => {
  const {
    data: relatedArticles,
    isLoading: isRelatedArticlesLoading,
    error: relatedArticlesError
  } = useGetArticles(createRelatedUserArticlesParams(author?.id as number)); //TODO: fix type assertion

  //TODO: introduce slekeleton on loading

  return (
    <div className="container--articleMeta">
      <div className="articleMeta">
        <div className="articleMeta__authorship">
          <p>Article author:</p>
          <div className="authorInfo">
            <img
              src={author?.avatar_url || '/src/assets/logo.svg'}
              alt={`avatar`}
            />
            <span>{author?.name}</span>
          </div>
        </div>
        <div className="articleMeta__related">
          <span>Posted by author: </span>
          <ul className="articleMeta__relatedList">
            {isRelatedArticlesLoading ? <></> : <></>}
            {relatedArticlesError ? <></> : <></>}
            {/* introduce limit and show ... if there are more that will link to all author articles*/}
            {relatedArticles?.data?.map((a) => {
              return (
                <li
                  className="articleMeta__relatedItem"
                  key={`rel-article-${a.id}`}
                >
                  <Link to={`/articles/${a.id}`}>{a.title}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/*
TODO: Change a to Link
TODO: change styles, implement common navlist element extend footer list and this one
            */}
        <div className="articleMeta__share">
          <span>Share on social media:</span>
          <ul className="footerNav__list">
            <li className="footer__item">
              <a href="#" className="footerNav__link">
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
        </div>
      </div>
    </div>
  );
};

export default ArticleMeta;
