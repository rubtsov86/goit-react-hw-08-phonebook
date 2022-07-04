/* react, react-router-dom */

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

/* components */
import PatchForm from 'components/PatchForm';

/* style, propTypes */
import PropTypes from 'prop-types';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClick, id }) {
  useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return function clean() {
      document.removeEventListener('keydown', handleKeydown);
    };
  });

  const handleKeydown = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      onClick();
    }
  };

  const handleOverlay = e => {
    if (e.currentTarget === e.target) {
      onClick();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleOverlay}>
      <div className={s.Modal}>
        <PatchForm onClick={onClick} id={id} />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
};
