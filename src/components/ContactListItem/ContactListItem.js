import React from 'react';
import s from './ContactListItem.module.css';
import PropTypes from 'prop-types';
import { contactsOperations } from 'redux/contacts';
import { useDispatch } from 'react-redux';
import { Circles } from 'react-loader-spinner';

const ContactListItem = ({ id, name, number, loader }) => {
  const dispatch = useDispatch();

  return (
    <li className={s.item}>
      <span>{name}: </span>
      <span>{number}</span>

      <button
        className={s.button}
        id={id}
        name={name}
        onClick={evt => {
          dispatch(
            contactsOperations.deleteContact({
              id: evt.currentTarget.id,
              name: evt.currentTarget.name,
            })
          );
        }}
      >
        {loader ? (
          <Circles height="20" width="20" color="blue" ariaLabel="loading" />
        ) : (
          'Delete'
        )}
      </button>
    </li>
  );
};

ContactListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  loader: PropTypes.bool.isRequired,
};

export default ContactListItem;
