import React from 'react';
import s from './ContactListItem.module.css';
import PropTypes from 'prop-types';
import { contactsOperations } from 'redux/contacts';
import { useDispatch } from 'react-redux';
import { Circles } from 'react-loader-spinner';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactListItem = ({ id, name, number, loader }) => {
  const dispatch = useDispatch();

  return (
    <li className={s.item}>
      <div className={s.contactContainer}>
        <span className={s.name}>{name}:</span>
        <span className={s.number}>{number}</span>
      </div>

      <Button
        className={s.button}
        id={id}
        name={name}
        variant="outlined"
        startIcon={
          loader ? (
            <Circles height="20" width="20" color="blue" ariaLabel="loading" />
          ) : (
            <DeleteIcon />
          )
        }
        onClick={evt => {
          dispatch(
            contactsOperations.deleteContact({
              id: evt.currentTarget.id,
              name: evt.currentTarget.name,
            })
          );
        }}
      >
        Delete
      </Button>
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