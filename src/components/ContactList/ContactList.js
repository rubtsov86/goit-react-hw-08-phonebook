import ContactListItem from '../ContactListItem';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import { useEffect } from 'react';

const ContactList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
  }, [dispatch]);
  const allContacts = useSelector(contactsSelectors.getContacts);
  const filteredContacts = useSelector(contactsSelectors.getFilteredContacts);
  const loading = useSelector(contactsSelectors.getLoading);

  if (filteredContacts.length === 0 && allContacts.length !== 0) {
    return <p>Don't find any contact, try something else</p>;
  }
  return (
    <ul>
      {filteredContacts.map(({ name, number, id }) => (
        <ContactListItem
          key={id}
          id={id}
          name={name}
          number={number}
          loader={loading?.id === id}
        />
      ))}
    </ul>
  );
};

export default ContactList;
