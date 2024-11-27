import { ChangeEvent, Dispatch, SetStateAction } from 'react';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';

interface sortByProps {
  params: ApiArticlesIndexRequestParams;
  setParams: Dispatch<SetStateAction<ApiArticlesIndexRequestParams>>;
}

const SortBySelect = ({ params, setParams }: sortByProps) => {
  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const newSortOrder = event.target.value as 'asc' | 'desc';
    setParams({
      ...params,
      sort: { created_at: newSortOrder }
    });
  };

  return (
    <div>
      <label htmlFor="sort">Sort by:</label>
      <select
        name="sort"
        id="sort"
        onChange={handleSortChange}
        defaultValue={'none'}
      >
        <option value="none" disabled>
          None
        </option>
        <option value="asc">ASC</option>
        <option value="desc">DESC</option>
      </select>
    </div>
  );
};

export default SortBySelect;
