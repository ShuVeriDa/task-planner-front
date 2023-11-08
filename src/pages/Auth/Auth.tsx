import {FC, useState} from 'react';
import styles from './Auth.module.scss';
import {Login} from "../../components/Auth/Login/Login.tsx";
import {Register} from "../../components/Auth/Register/Register.tsx";
import {SubmitButton} from "../../components/SubmitButton/SubmitButton.tsx";
import stylesButton from '../../components/SubmitButton/SubmitButton.module.scss';
import cn from "clsx";
import {SubmitHandler, useForm} from "react-hook-form";
import {IAuthInputType} from "../../redux/types.ts";
import {useActions} from "../../hooks/useActions.ts";
import {useAuthRedirect} from "../../components/Auth/useAuthRedirect.ts";


const list = ['SIGN IN', "SIGN UP"]

export const Auth: FC = () => {
  useAuthRedirect()
  const {loginTC, registerTC} = useActions()
  const [type, setType] = useState<'login' | 'register'>('login')

  const switchToLogin = () => {
    setType('login')
  }

  const switchToRegister= () => {
    setType('register')
  }

  const {register, handleSubmit, formState: {errors}, reset} = useForm<IAuthInputType>({mode: 'onChange'})

  const onSubmit: SubmitHandler<IAuthInputType> = (data) => {
    if (type === 'login') loginTC(data)
    else if (type === 'register') registerTC(data)
    reset()
  }

  return (
    <div className={styles.auth}>
      <div className={styles.container}>
        <div className={styles.list}>
          <ul>
            {list.map((l, i) => {
              return <li key={i}
                         onClick={i === 0 ? switchToLogin : switchToRegister}
                         className={cn((i === 0 && type === 'login') || (i === 1 && type === 'register')
                           ? styles.active
                           : styles.listItem)
                         }>{l}</li>
            })}
          </ul>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.title}>
            <h2 className={styles.h2}>{type === 'login' ? "Вход" : "Регистрация"}</h2>
          </div>
          {type === 'login'
            ? <Login register={register}
                     errors={errors}
                     isPasswordRequired
            />
            : <Register register={register}
                        errors={errors}
                        isPasswordRequired
            />
          }
          <div className={styles.submit}>
            <SubmitButton styles={stylesButton}
                          title={type === 'login' ? "Войти" : "Зарегистрироваться"}
            />
          </div>
        </form>
      </div>
    </div>
  );
};