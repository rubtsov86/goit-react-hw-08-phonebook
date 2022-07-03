import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { register } from 'redux/auth/auth-operations';

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
    <form onSubmit={handleSubmit}>
      <label>
        name
        <input
          type="text"
          onChange={handleInput}
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>

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
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterView;
