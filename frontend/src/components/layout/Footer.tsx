const Footer = () => {
  return (
    <footer className="footer">
      <article className="container--footer">
        <div className="footer__content">
          <h3 className="footer__heading">Follow us on social media</h3>

          <nav className="footerNav">
            <ul className="footerNav__list">
              <li className="footer__item">
                <a href="#" className="footerNav__link">
                  <img
                    src="/src/assets/images/facebook-logo.svg"
                    alt="Facebook logo"
                  />
                </a>
              </li>
              <li className="footer__item">
                <a href="#">
                  <img
                    src="/src/assets/images/twitter-logo.svg"
                    alt="Twitter logo"
                  />
                </a>
              </li>
              <li className="footer__item">
                <a href="#">
                  <img
                    src="/src/assets/images/pinterest-logo.svg"
                    alt="Pinterest logo"
                  />
                </a>
              </li>
              <li className="footer__item">
                <a href="#">
                  <img
                    src="/src/assets/images/behance-logo.svg"
                    alt="Behance logo"
                  />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </article>
    </footer>
  );
};

export default Footer;
