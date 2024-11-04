import './style.scss';

const ArticlesContainer = () => {
  return (
    <main>
      <section className="articlesHero">
        <div className="container--articlesHero">
          <h1>Articles</h1>
        </div>
      </section>

      <section className="articlesPageList">
        <div className="container--articlesPageList">
          <div className="articlesListHeading">
            <form action="" className="searchArticlesForm">
              <input type="text" placeholder="Search by keyword.." />
              <button>
                <img src="/assets/images/search-icon.svg" alt="" />
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
            <a href="" className="articleCard">
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
                  <h3 className="cardContent__title">Lorem ipsum dolor sit</h3>
                  <p className="cardContent__author">By: Author Name</p>
                </div>
              </div>
            </a>
            {/* end articleCard */}
            <a href="" className="articleCard">
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
                  <h3 className="cardContent__title">Lorem ipsum dolor sit</h3>
                  <p className="cardContent__author">By: Author Name</p>
                </div>
              </div>
            </a>
            <a href="" className="articleCard">
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
                  <h3 className="cardContent__title">Lorem ipsum dolor sit</h3>
                  <p className="cardContent__author">By: Author Name</p>
                </div>
              </div>
            </a>
            <a href="" className="articleCard">
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
                  <h3 className="cardContent__title">Lorem ipsum dolor sit</h3>
                  <p className="cardContent__author">By: Author Name</p>
                </div>
              </div>
            </a>
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
