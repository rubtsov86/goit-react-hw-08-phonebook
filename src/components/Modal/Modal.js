import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import s from './Modal.module.css';
import { createPortal } from 'react-dom';
import PatchForm from 'components/PatchForm';

const modalRoot = document.querySelector('#modal-root');

function Modal({ onClick, showModal }) {
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
        <PatchForm onClick={onClick} showModal={showModal} />
      </div>
    </div>,
    modalRoot
  );
}

export default Modal;

Modal.propTypes = {
  onClick: PropTypes.func.isRequired,
};
