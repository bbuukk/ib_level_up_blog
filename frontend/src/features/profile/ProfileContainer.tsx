import './ProfileContainer.scss';

const ProfileContainer = () => {
  return (
    <main>
      <section className="profileHero">
        <div className="container--profileHero">
          <div className="profileHero__left">
            <h1>
              Welcome, <span> Author Name</span>
            </h1>
            <ul>
              <li>
                <a href="">Edit profile</a>
              </li>
              <li>
                <a href="">Edit subscription</a>
              </li>
            </ul>
          </div>
          <div className="profileHeroImage">
            <img
              className="profileHeroImage__image"
              src="https://picsum.photos/130/130"
              alt=""
            />
          </div>
        </div>
      </section>

      <section className="articlesPageList">
        <div className="container--articlesPageList">
          <a href="" className="button--createArticle">
            Create article
          </a>
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
        </div>
      </section>
    </main>
  );
};

export default ProfileContainer;
