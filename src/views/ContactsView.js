import Phonebook from '../components/Phonebook';
import Filter from '../components/Filter';
import ContactList from '../components/ContactList';
import { useSelector } from 'react-redux';
import { contactsSelectors } from 'redux/contacts';

const ContactsView = () => {
  const error = useSelector(contactsSelectors.getError);
  return (
    <div>
      <h1>Phonebook</h1>
      <Phonebook />
      <h2>Contacts</h2>
      <Filter />
      {error ? <h2>{error}, please try latter</h2> : <ContactList />}
    </div>
  );
};

export default ContactsView;
