import { Button, Loader } from '@mantine/core';
import { Link, Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import LoginFormModal from 'features/authentication/LoginFormModal';
import useLogout from 'features/authentication/server/useLogout';
import useNewAuth from 'features/authentication/server/useNewAuth';
import IsAuthorizedRequestStatus from 'features/authentication/types/IsAuthorizedRequestStatus';

interface NavigationBarProps {
  openLoginModal: () => void;
}

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/articles', label: 'Articles' },
  { to: '/profile', label: 'Profile' },
  { to: '/playground', label: 'Playground' }
] as const;

interface AuthorizationButtonsProps {
  isAuthorizedStatus: IsAuthorizedRequestStatus;
  loginCb: () => void;
  logoutCb: () => void;
}

const AuthorizationButtons = ({
  isAuthorizedStatus,
  loginCb,
  logoutCb
}: AuthorizationButtonsProps) => {
  if (isAuthorizedStatus === IsAuthorizedRequestStatus.UNKNOWN) {
    return <Loader size="xs" aria-label="loader authorized status" />;
  }

  return (
    <>
      {isAuthorizedStatus === IsAuthorizedRequestStatus.NOT_AUTHORIZED && (
        <Button variant="outline" onClick={loginCb}>
          Sign In
        </Button>
      )}
      {isAuthorizedStatus === IsAuthorizedRequestStatus.AUTHORIZED && (
        <Button variant="outline" onClick={logoutCb}>
          Log Out
        </Button>
      )}
    </>
  );
};

const NavigationBar = ({ openLoginModal }: NavigationBarProps) => {
  const logout = useLogout();

  const isAuthorizedStatus = useNewAuth();

  return (
    <header className="header">
      <div className="container--header">
        <a href="/" className="header__logo">
          aspire <span>Blog</span>
        </a>
        {/* add ".nav--active" modifier to trigger mobile nav */}
        <nav className="nav">
          <ul className="nav__list">
            {LINKS.map((link) => (
              <li key={link.to}>
                <Link to={link.to} className="nav__link">
                  {link.label}
                </Link>
              </li>
            ))}
            <AuthorizationButtons
              isAuthorizedStatus={isAuthorizedStatus}
              logoutCb={logout}
              loginCb={openLoginModal}
            />
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
  return <div className="container mx-auto p-4 pt-0">{children}</div>;
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
