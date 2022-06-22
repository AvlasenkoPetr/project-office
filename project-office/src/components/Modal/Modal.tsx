import React from 'react';
import { Portal } from '../Portal/Portal';
import './Modal.css';

interface IProps {
  title: string;
  submitText: string;
  isOpen: boolean;
  status: 'FREE' | 'BUSY';
  closeModal: () => void;
  onSubmit: () => void;
}

export const Modal: React.FC<IProps> = ({
  title,
  submitText,
  status,
  isOpen,
  closeModal,
  onSubmit,
  children,
}) => {
  return (
    <>
      {isOpen && (
        <Portal>
          <div className="overlay" onClick={closeModal}>
            <div className="modal_container" onClick={(e) => e.stopPropagation()}>
              <div className="modal_container__header">
                <h3>{title}</h3>
                <button className="modal_container__close_button" onClick={closeModal} />
              </div>
              {children}
              <div className="modal_container__main_buttons">
                {status === 'FREE' && (
                  <button
                    className="modal_container__button modal_container__submit_button"
                    onClick={onSubmit}
                  >
                    {submitText}
                  </button>
                )}
                <button
                  className="modal_container__button modal_container__cancel_button"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};
