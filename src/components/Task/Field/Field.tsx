import {ChangeEvent, FC} from 'react';
import {ICreateTask} from "../../../services/task.type.ts";
import {UseFormRegister} from "react-hook-form";
import {IValueInput} from "../../Main/Main.tsx";
import DateTimePicker from "react-datetime-picker";
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-clock/dist/Clock.css';


interface IFieldProps {
  register?: UseFormRegister<ICreateTask>
  onChangeTitle?: (text: string) => void
  onChangeDescription?: (description: string) => void
  styles?: { readonly [key: string]: string }
  isButton?: boolean
  titleValue?: string
  descriptionValue?: string
  date?:IValueInput | any
  setDate?: (date:IValueInput | any) => void
}

export const Field: FC<IFieldProps> = (
  {
    styles , descriptionValue,setDate, date,
    isButton, titleValue, register,
    onChangeTitle, onChangeDescription
  }
) => {

  const onChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeTitle) {
      onChangeTitle(e.currentTarget.value)
    }
  }

  const onChangeDesc = (e: ChangeEvent<HTMLInputElement>) => {
    if (onChangeDescription) {
      onChangeDescription(e.currentTarget.value)
    }
  }

  return (
    <div className={styles?.field}>
      <input {...register ? register('title') : {}}
             className={styles?.input}
             type="text"
             value={titleValue}
             placeholder={'Enter title here'}
             onChange={onChangeText}
      />
      <input {...register ? register('description') : {}}
             className={styles?.input}
             type="text"
             value={descriptionValue}
             placeholder={'Enter description here'}
             onChange={onChangeDesc}
      />
      <div className={styles?.dateAndBtn}>
        <DateTimePicker onChange={setDate} value={date} disableClock className={'react-datetime-picker'}/>
        {isButton && <button className={styles?.btn}>Submit</button>}
      </div>

    </div>
  );
};