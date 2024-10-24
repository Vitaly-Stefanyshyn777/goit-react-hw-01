import FriendListItem from '../FriendListItem/FriendListItem';
import s from './FriendList.module.css';

const FriendList = ({ friends }) => {
  const friendsMember = friends.map(friend => (
    <li className={s.friendItem} key={friend.id}>
      <FriendListItem
        avatar={friend.avatar}
        name={friend.name}
        isOnline={friend.isOnline}
      />
    </li>
  ));

  return <ul className={s.friendsList}>{friendsMember}</ul>;
};

export default FriendList;
