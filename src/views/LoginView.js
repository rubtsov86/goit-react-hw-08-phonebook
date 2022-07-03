import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logIn } from 'redux/auth/auth-operations';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const handleInput = evt => {
    switch (evt.currentTarget.name) {
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
    dispatch(logIn({ email, password }));
    setEmail('');
    setPassword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        email
        <input
          type="email"
          onChange={handleInput}
          name="email"
          value={email}
          required
        />
      </label>

      <label>
        password
        <input
          type="password"
          onChange={handleInput}
          name="password"
          value={password}
          required
        />
      </label>

      <button type="submit">
        {/* {loading ? (
          <Circles height="15" width="15" color="blue" ariaLabel="loading" />
        ) : (
          'Add contact'
        )} */}
        Войти
      </button>
    </form>
  );
};

export default LoginView;
