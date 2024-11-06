import { useQuery } from '@tanstack/react-query';
import './style.scss';
import { getArticles } from 'utils/axios';
import CreateArticle from './CreateArticle';
import useGetArticles from './server/useGetArticles';

const ArticlesContainer = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  const { data: anotherData } = useGetArticles();

  console.log('RQ data, isLoading:', data, isLoading);
  console.log('Another RQ instance:', anotherData);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <section className="articlesHero">
        <div className="container--articlesHero">
          <h1>Articles</h1>
        </div>
      </section>

      <CreateArticle />

      <section className="articlesPageList">
        <div className="container--articlesPageList">
          <div className="articlesListHeading">
            <form action="" className="searchArticlesForm">
              <input type="text" placeholder="Search by keyword.." />
              <button>
                <img src="/src/assets/images/search-icon.svg" alt="" />
              </button>
            </form>
            <nav>
              <ul className="listTabs">
                <li className="tag--tabActive">All</li>
                <li className="tag--tab">AI</li>
                <li className="tag--tab">Design</li>
                <li className="tag--tab">Programming</li>
              </ul>
            </nav>
          </div>
          <div className="articlesListSort">
            <p>
              Showing <span>10</span> / <span>30</span>
            </p>
            <div>
              <label htmlFor="sort">Sort by:</label>
              <select name="sort" id="sort">
                <option value="">ASC</option>
                <option value="">DES</option>
              </select>
            </div>
          </div>
          <div className="articlesList">
            {/* <!-- start articleCard --> */}
            {data?.data.map((article) => (
              <a href="" className="articleCard" key={article.id}>
                <div className="premiumFlag--articleCard">
                  <img className="" src="/assets/images/premium-icon.svg" />
                </div>
                <div className="articleCard__imgBox">
                  <img src="https://picsum.photos/500/380" alt="" />
                </div>
                <div className="articleCard__body">
                  <div className="tag--articleCard">Design</div>
                  <div className="cardContent cardContent--articleCard">
                    <p className="cardContent__date">May, 4 2024</p>
                    <h3 className="cardContent__title">{article.title}</h3>
                    <p className="cardContent__author">By: Author Name</p>
                  </div>
                </div>
              </a>
            ))}

            {/* end articleCard */}
          </div>
          <nav className="pagination">
            <ul className="pagination__list">
              <li className="pagination__item--active">
                <span>1</span>
              </li>
              <li className="pagination__item">
                <span>2</span>
              </li>
              <li className="pagination__item">
                <span>3</span>
              </li>
              <li className="pagination__item">
                <span>4</span>
              </li>
            </ul>
          </nav>
        </div>
      </section>
    </main>
  );
};

export default ArticlesContainer;
