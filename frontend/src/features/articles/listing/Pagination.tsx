import { Dispatch, SetStateAction } from 'react';
import ApiArticle from 'types/ApiArticle';
import ApiArticlesIndexRequestParams from 'types/ApiArticlesIndexRequestParams';
import ApiPaginatedResponse from 'types/ApiPaginatedResponse';

interface paginationProps {
  data?: ApiPaginatedResponse<ApiArticle>;
  params: ApiArticlesIndexRequestParams;
  setParams: Dispatch<SetStateAction<ApiArticlesIndexRequestParams>>;
}

//TODO: use mantine pagination
const Pagination = ({ data, params, setParams }: paginationProps) => {
  const handlePageChange = (page: number) => {
    setParams({
      ...params,
      page
    });
  };

  if (!data) {
    return <div className="paginationLoader">Loading...</div>;
  }

  return (
    <nav className="pagination">
      <ul className="pagination__list">
        {Array.from(
          { length: data?.last_page as number },
          (_, index) => index + 1
        ).map((page) => (
          <li
            className={`pagination__item ${
              params.page === page ? 'pagination__item--active' : ''
            }`}
            key={page}
            onClick={() => handlePageChange(page)}
          >
            <span>{page}</span>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
