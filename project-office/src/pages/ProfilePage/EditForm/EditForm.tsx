import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormLabel } from '../../../components/FormLabel/FormLabel';
import { IUser } from '../../../helpers/interfaces';
import { useAuth } from '../../../hooks/useAuth';
import './EditForm.css';
import '../../../styles/Form.scss';
import { ISignUpUser, ISubmitData } from '../../../components/SignUpForm/SignUpForm';
import { ILoginResponse } from '../../../components/LoginForm/LoginForm';

export const EditForm: React.FC = () => {
  const { baseUrl, token, signIn, signOut } = useAuth();
  const [user, setUser] = useState<IUser | null>(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm();

  const getSelfInfo = async () => {
    try {
      const res = await fetch(`${baseUrl}/user/self`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data: IUser = await res.json();
      setUser(data);
    } catch {}
  };

  useEffect(() => {
    getSelfInfo();
  }, []);

  useEffect(() => {
    setValue('username', user?.username);
    setValue('firstName', user?.firstName);
    setValue('lastName', user?.lastName);
    setValue('email', user?.email);
    setValue('adress', user?.address);
    setValue('newPassword', '');
    setValue('oldPassword', '');
  }, [user]);

  const isPasswordCorrect = async (data: ISubmitData) => {
    const loginBody = {
      username: user?.username,
      password: data.oldPassword,
    };
    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(loginBody),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      });
      const resJson: ILoginResponse = await res.json();
      const newtoken = resJson.jwt.accessToken;
      const isAdmin = resJson.user.roles.find((role) => role.role === 'ROLE_ADMIN') ? true : false;
      signIn(newtoken, isAdmin);
      try {
        updateUser(data);
      } catch {}
    } catch {
      setError('oldPassword', { message: 'wrong password' });
    }
  };

  const updateUser = async (data: ISubmitData) => {
    try {
      const newUserData: ISignUpUser = {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        address: data.adress,
        password: data.newPassword || data.oldPassword,
        admin: false,
      };
      const res = await fetch(`${baseUrl}/user/update`, {
        method: 'POST',
        body: JSON.stringify(newUserData),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: `Bearer ${token}`,
        },
      });
      const resJson: IUser = await res.json();
      getSelfInfo();
    } catch {}
  };

  return (
    <>
      <form className="edit-form form" onSubmit={handleSubmit(isPasswordCorrect)}>
        <FormLabel
          text="Username"
          type="text"
          name="username"
          register={register}
          errors={errors}
        />
        <FormLabel
          text="First name"
          type="text"
          name="firstName"
          register={register}
          errors={errors}
        />
        <FormLabel
          text="Last name"
          type="text"
          name="lastName"
          register={register}
          errors={errors}
        />
        <FormLabel text="Email" type="email" name="email" register={register} errors={errors} />
        <FormLabel text="Adress" type="text" name="adress" register={register} errors={errors} />
        <label>
          <p>New password</p>
          <input type="password" {...register('newPassword')} />
        </label>
        <FormLabel
          text="Old password"
          type="password"
          name="oldPassword"
          register={register}
          errors={errors}
        />
        <button type="submit" className="submit-button">
          Submit changes
        </button>
      </form>
      <button className="logout-button" onClick={() => signOut(() => {})}>
        Logout
      </button>
    </>
  );
};
