import {forwardRef, InputHTMLAttributes} from 'react';
import {FieldError} from "react-hook-form";

interface IInputProps {
  error?: FieldError | undefined | any
  styles?: { readonly [key: string]: string }
  placeholder?: string
  type?: string
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement> & IInputProps>(
  (
    {
      error, styles, type, placeholder, ...rest
    }, ref
  ) => {

    return (
      <div className={styles?.input}>
        <input type={type}
               {...rest}
               placeholder={placeholder}
               ref={ref}
        />
        {error && <div className={styles?.errorWrapper}>
          {error && error.type && <div className={styles?.error}>{error.message}</div>}
        </div>}
      </div>
    );
  })