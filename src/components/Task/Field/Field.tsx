import {ChangeEvent, FC} from 'react';
import {ICreateTask} from "../../../services/task.type.ts";
import {UseFormRegister} from "react-hook-form";
// import DateTimePicker from "react-datetime-picker/dist/esm";
import {IValueInput} from "../../Main/Main.tsx";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';
import DateTimePicker from "react-datetime-picker";

interface IFieldProps {
  register?: UseFormRegister<ICreateTask>
  onChange?: (text: string) => void
  styles?: { readonly [key: string]: string }
  isButton?: boolean
  value?: string
  date?:IValueInput
  setDate?: (date:IValueInput) => void
}

export const Field: FC<IFieldProps> = (
  {
    styles ,setDate, date,
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
      <input {...register ? register('title') : {}}
             className={styles?.input}
             type="text"
             value={value}
             placeholder={'Enter title here'}
             onChange={onChangeText}
      />
      <input {...register ? register('description') : {}}
             className={styles?.input}
             type="text"
             value={value}
             placeholder={'Enter description here'}
             onChange={onChangeText}
      />
      <div className={styles?.dateAndBtn}>
        <DateTimePicker onChange={setDate} value={date} disableClock className={'react-datetime-picker'}/>
        {isButton && <button className={styles?.btn}>Submit</button>}
      </div>

    </div>
  );
};