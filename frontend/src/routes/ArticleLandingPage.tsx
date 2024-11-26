import './ArticleLandingPage.scss';
import { axiosInstance } from 'utils/axios';
import { useLoaderData } from 'react-router-dom';

import { LoaderFunctionArgs } from 'react-router-dom';
import Article from 'types/ApiArticle';
import CommentsSection from 'features/articles/landing/comments/CommentsSection';
import useGetMe from 'features/authentication/server/useGetMe';

//TODO: use Default image for article if there is none.
export async function loader({ params }: LoaderFunctionArgs): Promise<Article> {
  const { id } = params;

  const response = await axiosInstance({
    method: 'get',
    url: `/api/articles/${id}`
  });

  return response.data;
}

const ArticleLandingPage = () => {
  const { id, title, content, created_at, comments } =
    useLoaderData() as Article;

  const { data: user } = useGetMe();

  //TODO:Make the comment submission a RQ mutation, and invalidate the corresponding query cache, so it’ll load the latest comments.
  //TODO: load other articles of this author

  const formattedCreatedAtDate = new Date(created_at).toLocaleDateString(
    'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  );

  return (
    <div className="landingArticle">
      <div className="landingArticle__imgBox">
        <img
          className="landingArticle__image"
          src="https://picsum.photos/900/350"
          alt="article hero"
        />
      </div>
      <div className="landingArticle__body">
        <div className="landingArticle__content">
          <div className="landingArticle__contentHeader">
            <div className="tag">Design</div>
            <a href="/">{`<- Back to blog`}</a>
            <time dateTime={created_at}>{formattedCreatedAtDate}</time>
          </div>
          <div className="landingArticle__divider" />
          <h2 className="landingArticle__heading">{title}</h2>
          <p className="landingArticle__text">{content}</p>
        </div>
        <div className="authorship">
          <div className="authorship__user">
            <img
              className="comment__img"
              src={user?.avatar_url}
              alt={`avatar`}
            />
            <span>{user?.name}</span>
          </div>
          <div className="authorship__related">
            <span>Posted by author: </span>
          </div>

          <div className="authorship__share">
            <></>
          </div>
        </div>
      </div>

      <CommentsSection articleId={id} comments={comments} />
    </div>
  );
};

export default ArticleLandingPage;
