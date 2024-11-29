import './ArticleLandingPage.scss';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import CommentsSection from 'features/articles/landing/comments/CommentsSection';
import ArticleMeta from 'features/articles/landing/ArticleMeta';
import { Loader } from '@mantine/core';
import useGetArticleByid from 'features/articles/landing/server/useGetArticleById';

//TODO: display actual tags of article
//TODO: use Default image for article if there is none.
//TODO: make the comment submission a RQ mutation, and invalidate the corresponding query cache, so it’ll load the latest comments.
//TODO: load other articles of this author
const ArticleLandingPage = () => {
  const { id } = useParams();

  const {
    data: article,
    isLoading,
    error
  } = useGetArticleByid(parseInt(id as string, 10));

  //TODO create better loading state
  if (isLoading) {
    return (
      <div className="landingArticleLoader">
        <Loader size={50} />
      </div>
    );
  }

  if (error || !article) {
    return <div>Error...</div>; //TODO create better error state
  }

  const {
    id: articleId,
    title,
    content,
    cover_url,
    created_at,
    comments,
    author
  } = article;

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
          src={cover_url}
          alt="article hero"
        />
      </div>
      <div className="landingArticle__body">
        <div className="landingArticle__content">
          <div className="landingArticle__contentHeader">
            <div className="tag">Design</div>
            <Link to="/">{`<- Back to blog`}</Link>
            <time dateTime={created_at}>{formattedCreatedAtDate}</time>
          </div>
          <div className="landingArticle__divider" />
          <h2 className="landingArticle__heading">{title}</h2>
          <p className="landingArticle__text">{content}</p>
        </div>
        <ArticleMeta author={author} />
      </div>

      <CommentsSection articleId={articleId} comments={comments} />
    </div>
  );
};

export default ArticleLandingPage;
