import IsAuthorizedRequestStatus from 'features/authentication/types/IsAuthorizedRequestStatus';
import { Loader } from '@mantine/core';
import './Root.scss';
import useNewAuth from 'features/authentication/server/useNewAuth';

import Article from 'types/ApiArticle';

import FeaturedArticleCard from 'features/articles/listing/FeaturedArticleCard';
import ArticleCard from 'features/articles/listing/ArticleCard';

import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import ApiTag from 'types/ApiTag';
import { useState } from 'react';
import useGetArticles from 'features/articles/server/useGetArticles';
import useGetTags from 'features/articles/server/useGetTags';
import { PAGE_SIZE } from 'utils/constants';

export const defaultPaginatedQueryParams = {
  page: 1
};

export const featuredArticlesQueryParams = {
  ...defaultPaginatedQueryParams,
  tag: { label: 'featured' }
};

export const latestArticlesQueryParams = {
  ...defaultPaginatedQueryParams,
  sort: { created_at: 'desc' as const }
};

//TODO: introduce loading spinner on tag change
const Root = () => {
  const [tagParam, setTagParam] = useState<ApiArticlesIndexRequestParams>({});

  //TODO!
  const {
    data: featuredArticles,
    isLoading: isFeaturedArticlesLoading,
    error: featuredArticlesError
  } = useGetArticles(featuredArticlesQueryParams);

  //TODO!
  const {
    data: latestArticles,
    isLoading: isLatestArticlesLoading,
    error: latestArticlesError
  } = useGetArticles({ ...latestArticlesQueryParams, ...tagParam });

  //TODO!
  const {
    data: tags
    // isTagsLoading,
    // tagsError
  } = useGetTags(defaultPaginatedQueryParams);

  const isAuthorized = useNewAuth();

  const handleTagChange = (tag?: string) => {
    if (!tag) {
      setTagParam({});
    } else {
      setTagParam({
        tag: { label: tag }
      });
    }
  };

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
              {isFeaturedArticlesLoading ? (
                <Loader size={50} />
              ) : (
                featuredArticles?.data?.slice(0, 3).map((a: Article) => {
                  return <FeaturedArticleCard key={`article-${a.id}`} {...a} />;
                })
              )}
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
                  <li
                    className="tag--tabActive"
                    onClick={() => handleTagChange(undefined)}
                  >
                    All
                  </li>
                  {/* TODO!: implement dynamic tabActive tab */}
                  {/* TODO!: implement loader on isTagsLoading*/}
                  {tags?.data?.slice(0, 2).map((t: ApiTag) => {
                    return (
                      <li
                        className="tag--tab"
                        key={`tag-${t.label}`}
                        onClick={() => handleTagChange(t.label)}
                      >
                        {t.label}
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
            <div className="latestNews_articlesList">
              {isLatestArticlesLoading
                ? Array.from({ length: PAGE_SIZE }, (_, index) => index).map(
                    (idx) => {
                      return (
                        <div
                          className="articleSkeleton"
                          key={`articleSkeleton-${idx}`}
                        >
                          <Loader size={50} />
                        </div>
                      );
                    }
                  )
                : latestArticles?.data?.map((a) => {
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

    </>
  );
};

export default Root;
