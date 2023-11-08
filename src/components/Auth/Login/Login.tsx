import {FC} from 'react';
import styles from './Login.module.scss';
import stylesInput from '../../Input/Input.module.scss'
import {Input} from "../../Input/Input.tsx";
import {FieldErrors, UseFormRegister} from "react-hook-form";
import {validEmail} from "../../../utils/regex.ts";
import {IAuthInputType} from "../../../redux/types.ts";

interface ILoginProps {
  register: UseFormRegister<any>
  errors: FieldErrors<IAuthInputType>
  isPasswordRequired?: boolean
}

export const Login: FC<ILoginProps> = (
  {
    isPasswordRequired,
    errors,
    register,
  }
) => {
  return (
    <div className={styles.wrapper}>
      <Input {...register('email', {
          required: "Электронная почта обязательна",
          minLength: {
            value: 6,
            message: "Минимальная длина должна быть больше 6 символов"
          },
          maxLength: {
            value: 50,
            message: 'Максимальная длина должна быть меньше 50 символов'
          },
          pattern: {
            value: validEmail,
            message: 'Пожалуйста, введите действительный адрес электронной почты'
          }
        }
      )}
             placeholder={'Почта'}
             type={'email'}
             error={errors?.email}
             styles={stylesInput}
      />

      <Input {...register('password', isPasswordRequired ? {
          required: "Пароль обязателен",
          minLength: {
            value: 6,
            message: "Минимальная длина должна быть больше 6 символов"
          },
          maxLength: {
            value: 50,
            message: 'Максимальная длина должна быть меньше 50 символов'
          }
        } : {}
      )}
             placeholder={'Пароль'}
             type={'password'}
             error={errors?.password}
             styles={stylesInput}
      />
    </div>
  );
};