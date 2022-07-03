import ContactListItem from '../ContactListItem';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactsOperations, contactsSelectors } from 'redux/contacts';
import { useEffect } from 'react';
import s from './ContactList.module.css';
import Modal from 'components/Modal';

const ContactList = () => {
  const [showModal, setShowModal] = useState(false);

  const handleHideModal = e => {
    setShowModal(false);
  };

  const handleShowModal = e => {
    setShowModal(e.currentTarget.id);
  };

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
    <>
      <ul className={s.list}>
        {filteredContacts.map(({ name, number, id }) => (
          <ContactListItem
            key={id}
            id={id}
            name={name}
            number={number}
            loader={loading?.id === id}
            handleShowModal={handleShowModal}
          />
        ))}
      </ul>
      {showModal && <Modal onClick={handleHideModal} showModal={showModal} />}
    </>
  );
};

export default ContactList;
