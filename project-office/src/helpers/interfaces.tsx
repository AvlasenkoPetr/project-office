export interface IOffice {
  id: string;
  name: string;
  officeType: {
    id: number;
    type: string;
  };
  places: IWorkplace[];
}

export interface IWorkplace {
  id: number;
  status: 'FREE' | 'BUSY';
  posX: string;
  posY: string;
  deg: string;
  user: IUser | null;
}

export interface IUser {
  id: number;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  roles: [
    {
      id: number;
      role: string;
    }
  ];
}
