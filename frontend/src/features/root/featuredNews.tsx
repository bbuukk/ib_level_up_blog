import { Loader } from '@mantine/core';
import FeaturedArticleCard from 'features/articles/listing/FeaturedArticleCard';
import useGetArticles from 'features/articles/server/useGetArticles';

export const featuredArticlesQueryParams = {
  page: 1,
  tag: { label: 'featured' }
};

const FeaturedNews = () => {
  const {
    data: featuredArticles,
    isLoading: isFeaturedArticlesLoading,
    error: featuredArticlesError
  } = useGetArticles(featuredArticlesQueryParams);

  if (featuredArticlesError) {
    return <div>{`Error loading`}</div>;
  }

  return (
    <section className="featuredNews">
      <div className="container--featuredNews">
        <div className="featuredNews__heading">
          <h2>Featured news</h2>
          <a href="/articles?tag=featured">All featured news</a>
        </div>
        <div className="featuredCardsList">
          {isFeaturedArticlesLoading ? (
            <Loader size={50} />
          ) : (
            featuredArticles?.data?.slice(0, 3).map((a) => {
              return <FeaturedArticleCard key={`article-${a.id}`} {...a} />;
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedNews;
