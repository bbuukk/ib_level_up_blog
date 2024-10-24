import { Link, Outlet } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <header className="header">
      <div className="container--header">
        <a href="/" className="header__logo">
          Acad asdfasdemy<span>Blog</span>
        </a>
        {/* add ".nav--active" modifier to trigger mobile nav */}
        <nav className="nav">
          <ul className="nav__list">
            <li>
              <Link to="/" className="nav__link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/basic-react-query" className="nav__link">
                Basics RQ
              </Link>
            </li>
          </ul>
          <div className="nav__toggle nav__toggle--active">
            <img
              className="nav__open"
              src="/src/assets/images/menu-icon.svg"
              alt="Menu icon"
            />
            <img
              className="nav__close"
              src="/src/assets/images/close-icon.svg"
              alt="Menu icon"
            />
          </div>
        </nav>
      </div>
    </header>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="container mx-auto p-4">{children}</div>;
};

const Layout = () => {
  return (
    <div>
      <NavigationBar />
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
