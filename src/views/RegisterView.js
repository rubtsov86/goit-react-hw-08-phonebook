import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/auth-operations';
import s from './LoginView.module.css';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const RegisterView = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleInput = evt => {
    switch (evt.currentTarget.name) {
      case 'name':
        setName(evt.currentTarget.value);
        break;
      case 'email':
        setEmail(evt.currentTarget.value);
        break;
      case 'password':
        setPassword(evt.currentTarget.value);
        break;
      default:
        console.log('something went wrong');
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    dispatch(register({ name, email, password }));
    setName('');
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <h2 className={s.title}>Register form</h2>
      <label htmlFor="name" className={s.label}>
        name
      </label>
      <input
        type="text"
        onChange={handleInput}
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        id="name"
        className={s.input}
      />

      <label htmlFor="registerEmail" className={s.label}>
        email
      </label>
      <input
        type="email"
        onChange={handleInput}
        name="email"
        value={email}
        required
        id="registerEmail"
        className={s.input}
      />

      <label htmlFor="password" className={s.label}>
        password
      </label>
      <input
        type="password"
        onChange={handleInput}
        name="password"
        value={password}
        required
        id="password"
        className={s.input}
      />

      <Button
        type="submit"
        variant="contained"
        endIcon={<SendIcon />}
        size="large"
      >
        Register
      </Button>

      {/* <button type="submit"> */}
      {/* {loading ? (
          <Circles height="15" width="15" color="blue" ariaLabel="loading" />
        ) : (
          'Add contact'
        )} */}
      {/* Зарегистрироваться
      </button> */}
    </form>
  );
};

export default RegisterView;
