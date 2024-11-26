import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import ApiTag from 'types/ApiTag';

import { Dispatch, SetStateAction, useState } from 'react';
import useGetTags from '../server/useGetTags';
import capitalize from 'utils/capitalize';

interface articlesProps {
  params: ApiArticlesIndexRequestParams;
  setParams: Dispatch<SetStateAction<ApiArticlesIndexRequestParams>>;
}

export const paginatedQueryParams = {
  page: 1
};

const TagSelect = ({ params, setParams }: articlesProps) => {
  const isActive = (tag?: string) => {
    if (!tag && !params.tag) return true;
    return params.tag?.label === tag;
  };

  const {
    data: tags,
    isLoading: isTagsLoading,
    error: tagsError
  } = useGetTags(paginatedQueryParams);

  const handleTagChange = (tag?: string) => {
    setParams({
      ...params,
      tag: tag ? { label: tag } : undefined
    });
  };

  if (tagsError) {
    return <div>{`Error fetching tags`}</div>;
  }

  if (isTagsLoading) {
    return <div>{`Loading tags...`}</div>;
  }

  // TODO: fix articles skeleton fickering on tag change
  return (
    <nav>
      <ul className="listTabs">
        <li
          className={`${isActive(undefined) ? 'tag--tabActive' : 'tag--tab'}`}
          onClick={() => handleTagChange(undefined)}
        >
          All
        </li>
        {tags?.data?.slice(0, 2).map((t: ApiTag) => {
          return (
            <li
              className={`${isActive(t.label) ? 'tag--tabActive' : 'tag--tab'}`}
              key={`tag-${t.label}`}
              onClick={() => handleTagChange(t.label)}
            >
              {capitalize(t.label)}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
export default TagSelect;
