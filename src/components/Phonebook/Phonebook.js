import { useState } from 'react';
import s from './Phonebook.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import toast from 'react-hot-toast';
import { Circles } from 'react-loader-spinner';

function Phonebook() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(contactsSelectors.getContacts);
  const loading = useSelector(contactsSelectors.getLoading);
  const dispatch = useDispatch();

  const handleInput = evt => {
    switch (evt.currentTarget.name) {
      case 'name':
        setName(evt.currentTarget.value);
        break;
      case 'number':
        setNumber(evt.currentTarget.value);
        break;
      default:
        console.log('wrong name');
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addContactToContacts(name, number);
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const addContactToContacts = (name, number) => {
    const isNameInContacts = contacts
      .map(({ name }) => name.toLowerCase())
      .includes(name.toLowerCase());

    if (isNameInContacts) {
      toast.error(`${name} is already in contacts`, {
        duration: 3000,
        position: 'top-center',
      });
    } else {
      dispatch(contactsOperations.addContact({ name, number }));
      reset();
    }
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
          type="text"
          onChange={handleInput}
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          className={s.input}
        />
      </label>

      <label className={s.label}>
        Number
        <input
          type="tel"
          onChange={handleInput}
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          className={s.input}
        />
      </label>

      <button className={s.button} type="submit">
        {loading ? (
          <Circles height="15" width="15" color="blue" ariaLabel="loading" />
        ) : (
          'Add contact'
        )}
      </button>
    </form>
  );
}

export default Phonebook;
