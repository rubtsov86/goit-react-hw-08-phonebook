import Phonebook from '../components/Phonebook';
import Filter from '../components/Filter';
import ContactList from '../components/ContactList';
import { useSelector } from 'react-redux';
import { contactsSelectors } from 'redux/contacts';
import s from './LoginView.module.css';

const ContactsView = () => {
  const error = useSelector(contactsSelectors.getError);
  return (
    <div className={s.container}>
      <Phonebook />
      <div>
        <Filter />
        {error ? <h2>{error}, please try latter</h2> : <ContactList />}
      </div>
    </div>
  );
};

export default ContactsView;
