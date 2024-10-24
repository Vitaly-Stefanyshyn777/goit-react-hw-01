import s from './Profile.module.css';

const Profile = ({ name, tag, location, image, stats }) => {
  return (
    <div className={s.card}>
      <div className={s.cardTop}>
        <img className={s.image} src={image} alt={name} />
        <p className={s.userName}>{name}</p>
        <p className={s.text}>@{tag}</p>
        <p className={s.text}>{location}</p>
      </div>

      <ul className={s.socList}>
        <li className={s.socItem}>
          <span>Followers</span>
          <span className={s.total}>{stats.followers}</span>
        </li>
        <li className={s.socItem}>
          <span>Views</span>
          <span className={s.total}>{stats.views}</span>
        </li>
        <li className={s.socItem}>
          <span>Likes</span>
          <span className={s.total}>{stats.likes}</span>
        </li>
      </ul>
    </div>
  );
};

export default Profile;
