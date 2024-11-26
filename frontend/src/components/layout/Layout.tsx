import { Button, Loader } from '@mantine/core';
import ScrollToTop from './ScrollToTop';
import { useLocation, Link, Outlet } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';

import LoginFormModal from 'features/authentication/LoginFormModal';
import useLogout from 'features/authentication/server/useLogout';
import useNewAuth from 'features/authentication/server/useNewAuth';
import IsAuthorizedRequestStatus from 'features/authentication/types/IsAuthorizedRequestStatus';
import PremiumBanner from './PremiumBanner';
import Footer from './Footer';
import RegisterFormModal from 'features/authentication/RegisterFormModal';

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
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') {
      return false;
    }
    return location.pathname.startsWith(path);
  };

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
                <Link
                  to={link.to}
                  className={`nav__link ${
                    isActive(link.to) ? 'nav__link--active' : ''
                  }`}
                >
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
  return <div className="container mx-auto px-4">{children}</div>;
};

const Layout = () => {
  const [loginOpened, { close: closeLogin, open: openLogin }] = useDisclosure();
  const [registerOpened, { close: closeRegister, open: openRegister }] =
    useDisclosure();

  return (
    <div>
      <ScrollToTop />
      <NavigationBar openLoginModal={openLogin} />
      <Container>
        <LoginFormModal
          isOpen={loginOpened}
          closeModal={closeLogin}
          switchModal={() => {
            closeLogin();
            openRegister();
          }}
        />
        <RegisterFormModal
          isOpen={registerOpened}
          closeModal={closeRegister}
          switchModal={() => {
            closeRegister();
            openLogin();
          }}
        />
        <Outlet />
      </Container>

      <PremiumBanner />
      <Footer />
    </div>
  );
};

export default Layout;
