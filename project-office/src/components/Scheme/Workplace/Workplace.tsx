import React from 'react';
import { useState } from 'react';
import { IWorkplace } from '../../../helpers/interfaces';
import { useAuth } from '../../../hooks/useAuth';
import { Modal } from '../../Modal/Modal';
import './Workplace.css';

interface Workplace extends IWorkplace {
  updatePlaces(): void;
}

export const Workplace: React.FC<Workplace> = ({
  id,
  status,
  posX,
  posY,
  user,
  deg,
  updatePlaces,
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { baseUrl, token } = useAuth();

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const reservePlace = async () => {
    try {
      const body = {
        userId: user?.id,
        placeId: id,
      };
      const res = await fetch(`${baseUrl}/office/user/place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
    } catch {
    } finally {
      closeModal();
      updatePlaces();
    }
  };

  return (
    <>
      <img
        src={require('../../../assets/img/place.png')}
        alt="workplace"
        className="workplace"
        onClick={openModal}
        style={{ top: `${posX}%`, left: `${posY}%`, transform: `rotate(${deg}deg)` }}
      />
      <Modal
        title="Workplace information"
        isOpen={isOpen}
        closeModal={closeModal}
        status={status}
        onSubmit={reservePlace}
        submitText="Reserve"
      >
        {status === 'FREE' ? (
          <h2>This workplace is free, do you want to reserve it?</h2>
        ) : (
          <>
            <h3>
              {user?.firstName} {user?.lastName}
            </h3>
            <h3>{user?.email}</h3>
            <h3>{user?.address}</h3>
          </>
        )}
      </Modal>
    </>
  );
};
