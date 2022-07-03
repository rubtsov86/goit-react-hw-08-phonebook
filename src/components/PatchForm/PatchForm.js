import { useState } from 'react';
import s from './PatchForm.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import { Circles } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';

function PatchForm({ onClick, showModal }) {
  const contacts = useSelector(contactsSelectors.getContacts);
  const contactToEdit = contacts.find(contact => contact.id === showModal);

  const [name, setName] = useState(contactToEdit.name);
  const [number, setNumber] = useState(contactToEdit.number);

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
    dispatch(contactsOperations.patchContact({ name, number, id: showModal }));
    onClick();
  };

  return (
    <form className={s.form} onSubmit={handleSubmit}>
      <h2 className={s.title}>Edit contact</h2>
      <label className={s.label} htmlFor="nameAdd">
        Name
      </label>
      <input
        type="text"
        onChange={handleInput}
        name="name"
        value={name}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        className={s.input}
        id="nameAdd"
      />

      <label className={s.label} htmlFor="numberAdd">
        Number
      </label>
      <input
        type="tel"
        onChange={handleInput}
        name="number"
        value={number}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        className={s.input}
        id="numberAdd"
      />

      <div className={s.buttonContainer}>
        <Button
          type="button"
          variant="contained"
          size="large"
          onClick={onClick}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          variant="contained"
          endIcon={
            loading ? (
              <Circles
                height="15"
                width="15"
                color="white"
                ariaLabel="loading"
              />
            ) : (
              <EditIcon />
            )
          }
          size="large"
        >
          Edit
        </Button>
      </div>
    </form>
  );
}

export default PatchForm;
