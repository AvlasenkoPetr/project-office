import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import officeImg from '../../assets/img/office.png';
import { IOffice, IWorkplace } from '../../helpers/interfaces';
import { useAuth } from '../../hooks/useAuth';
import './Scheme.css';
import { Workplace } from './Workplace/Workplace';

export const Scheme: React.FC = () => {
  const { baseUrl, token } = useAuth();
  const [offices, setOffices] = useState<IOffice[]>();
  const [currentOfficeNum, setcurrentOfficeNum] = useState<number>(0);
  const [workplaces, setWorkplaces] = useState<IWorkplace[] | null>(null);

  const getOffices = async () => {
    try {
      const res = await fetch(`${baseUrl}/office`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setOffices(data);
    } catch {}
  };

  const getPlaces = async () => {
    const res = await fetch(`${baseUrl}/office/${offices![currentOfficeNum].id}/places`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
    const data: IOffice = await res.json();
    setWorkplaces(data.places);
  };

  useEffect(() => {
    getOffices();
  }, []);

  useEffect(() => {
    if (offices) {
      setWorkplaces(offices[currentOfficeNum].places);
    }
  }, [offices]);

  return (
    <div className="scheme-container">
      <img src={officeImg} alt="office" className="scheme" />
      {offices &&
        workplaces &&
        workplaces.map((workplace) => {
          return (
            <Workplace
              id={workplace.id}
              status={workplace.status}
              user={workplace.user}
              posX={workplace.posX}
              posY={workplace.posY}
              deg={workplace.deg}
              updatePlaces={getPlaces}
              key={workplace.id}
            />
          );
        })}
    </div>
  );
};
