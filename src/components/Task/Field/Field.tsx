import {ChangeEvent, FC} from 'react';
import {ICreateTask} from "../../../services/task.type.ts";
import {UseFormRegister} from "react-hook-form";


interface IFieldProps {
  register?: UseFormRegister<ICreateTask>
  onChange?: (text: string) => void
  name: "title" | 'description' | "dateTime"
  styles?: { readonly [key: string]: string }
  isButton?: boolean
  value?: string
}

export const Field: FC<IFieldProps> = (
  {
    styles, name,
    isButton, value, register,
    onChange
  }
) => {

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.currentTarget.value)
    }
  }

  return (
    <div className={styles?.field}>
      <input {...register ? register(name) : {}}
             className={styles?.input}
             type="text"
             value={value}
             placeholder={'Enter todo here'}
             onChange={onChangeText}
      />
      {isButton && <button className={styles?.btn}>Submit</button>}
    </div>
  );
};