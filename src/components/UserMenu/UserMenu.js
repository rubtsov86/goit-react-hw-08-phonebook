import { useSelector, useDispatch } from 'react-redux';
import { getUserName } from '../../redux/auth/auth-selectors';
import { logOut } from '../../redux/auth/auth-operations';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { deepPurple } from '@mui/material/colors';
import s from './UserMenu.module.css';

const UserMenu = () => {
  const userName = useSelector(getUserName);
  const dispatch = useDispatch();

  return (
    <>
      <Avatar sx={{ bgcolor: deepPurple[500] }}>{userName.slice(0, 1)}</Avatar>
      <div className={s.text}>
        Добро пожаловать,
        <span className={s.userName}>{userName}</span>
        <Button
          color="inherit"
          type="buttom"
          onClick={() => dispatch(logOut())}
        >
          Выйти
        </Button>
      </div>
    </>
  );
};

export default UserMenu;
