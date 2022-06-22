import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { FormChangeButton } from '../FormChangeButton/FormChangeButton';
import '../../styles/Form.scss';
import { useForm } from 'react-hook-form';
import { FormLabel } from '../FormLabel/FormLabel';

export interface IFormProps {
  changeForm: () => void;
}

export interface ISubmitData {
  [key: string]: any;
}

export interface ISignUpUser {
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  admin: boolean;
}

export const SignUpForm: React.FC<IFormProps> = ({ changeForm }) => {
  const { baseUrl } = useAuth();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const sendRequest = async (data: ISubmitData) => {
    const newUser: ISignUpUser = {
      username: data.username,
      password: data.password,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      address: data.adress,
      admin: false,
    };

    try {
      const res = await fetch(`${baseUrl}/registration`, {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data = await res.json();
      if (data.status === 'INTERNAL_SERVER_ERROR') throw new Error();
      changeForm();
    } catch {
      setError('username', { message: 'пользователь уже существует' });
    }
  };

  return (
    <form className="form" name="form" onSubmit={handleSubmit(sendRequest)}>
      <FormLabel text="Login" type="text" name="username" register={register} errors={errors} />
      <FormLabel text="E-Mail" type="email" name="email" register={register} errors={errors} />
      <FormLabel
        text="First Name"
        type="text"
        name="firstName"
        register={register}
        errors={errors}
      />
      <FormLabel text="Last Name" type="text" name="lastName" register={register} errors={errors} />
      <FormLabel text="Adress" type="text" name="adress" register={register} errors={errors} />
      <FormLabel
        text="Password"
        type="password"
        name="password"
        register={register}
        errors={errors}
      />
      <button type="submit" className="submit-button">
        Sign Up
      </button>
      <FormChangeButton changeForm={changeForm}>Already have account?</FormChangeButton>
    </form>
  );
};
