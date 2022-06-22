import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../../hooks/useAuth';
import { IFormProps, ISubmitData } from '../SignUpForm/SignUpForm';
import '../../styles/Form.scss';
import { FormChangeButton } from '../FormChangeButton/FormChangeButton';
import { FormLabel } from '../FormLabel/FormLabel';
import { useForm } from 'react-hook-form';
import { IUser } from '../../helpers/interfaces';

interface ILoginBody {
  username: string;
  password: string;
}

export interface ILoginResponse {
  jwt: {
    type: string;
    accessToken: string;
    refreshToken: string;
  };
  user: IUser;
}

export const LoginForm: React.FC<IFormProps> = ({ changeForm }) => {
  const { signIn, baseUrl } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm();

  const sendRequest = async (data: ISubmitData) => {
    const login: ILoginBody = {
      username: data.username,
      password: data.password,
    };
    try {
      const res = await fetch(`${baseUrl}/api/auth/login`, {
        method: 'POST',
        body: JSON.stringify(login),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const data: ILoginResponse = await res.json();
      const token = data.jwt.accessToken;
      const isAdmin = data.user.roles.find((role) => role.role === 'ROLE_ADMIN') ? true : false;
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', data.jwt.refreshToken);
      localStorage.setItem('isAdmin', String(isAdmin));
      signIn(token, isAdmin, () => {
        navigate('/');
      });
    } catch {
      setError('username', { message: 'неверные данные' });
      setError('password', { message: 'неверные данные' });
    }
  };

  return (
    <form className="form" name="form" onSubmit={handleSubmit(sendRequest)}>
      <FormLabel text="Login" type="text" name="username" register={register} errors={errors} />
      <FormLabel
        text="Password"
        type="password"
        name="password"
        register={register}
        errors={errors}
      />
      <button type="submit" className="submit-button">
        Login
      </button>
      <FormChangeButton changeForm={changeForm}>Don&apos;t have account?</FormChangeButton>
    </form>
  );
};
