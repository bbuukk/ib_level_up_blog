const ProfileHero = ({
  name,
  avatar_url
}: {
  name?: string;
  avatar_url?: string;
}) => {
  const defaultAvatarUrl = 'https://picsum.photos/200/200';

  return (
    <section className="profileHero">
      <div className="container--profileHero">
        <div className="profileHero__left">
          <h1>
            Welcome, <span>{name}</span>
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
            src={avatar_url ?? defaultAvatarUrl}
            alt="user avatar"
          />
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;
