import React from 'react';
import { FieldValues, UseFormRegister, UseFormSetValue } from 'react-hook-form';

interface IProps {
  type: string;
  text: string;
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: ErrorsBlock;
}

export interface ErrorsBlock {
  [key: string]: any;
}

export const FormLabel: React.FC<IProps> = ({ text, type, name, register, errors }) => {
  return (
    <label>
      <p>{text}</p>
      <input type={type} {...register(name, { required: 'поле не заполнено' })} />
      <p className="label-error">{errors[name] && errors[name].message}</p>
    </label>
  );
};
