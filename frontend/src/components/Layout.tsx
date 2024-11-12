import { Button } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import LoginFormModal from 'features/authentication/LoginFormModal';
import useLogout from 'features/authentication/server/useLogout';

interface NavigationBarProps {
  openLoginModal: () => void;
}

const NavigationBar = ({ openLoginModal }: NavigationBarProps) => {
  const logout = useLogout();

  return (
    <header className="header">
      <div className="container--header">
        <a href="/" className="header__logo">
          aspire <span>Blog</span>
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
              <Link to="/articles" className="nav__link">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav__link">
                Profile
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav__link">
                Profile
              </Link>
            </li>
            <li>
              <Button variant="filled" color="green" onClick={openLoginModal}>
                Sign In
              </Button>
            </li>
            <li>
              <Button variant="filled" color="red" onClick={logout}>
                Log out
              </Button>
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
  const [opened, { close, open }] = useDisclosure();

  return (
    <div>
      <NavigationBar openLoginModal={open} />
      <Container>
        <LoginFormModal isOpen={opened} closeModal={close} />
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
