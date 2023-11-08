import {FC, useState} from 'react';
import styles from './Main.module.scss';
import './Calendar.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {Field} from "../Task/Field/Field.tsx";
import {ICreateTask} from "../../services/task.type.ts";
import stylesTodolist from '../Task/Field/TaskField.module.scss';
import {useTaskQuery} from "../../react-query/useTaskQuery.ts";
import {format} from 'date-fns-tz';

export type IDatePiece = Date | null;

export type IValueInput = IDatePiece | [IDatePiece, IDatePiece];

export const Main: FC = () => {
  const [date, setDate] = useState<IValueInput>(new Date())
  const originalDate = new Date(date!.toString());
  const formattedDate = format(originalDate, "yyyy-MM-dd HH:mm", { timeZone: 'Europe/Moscow' });

  const {getTasks, createTask} = useTaskQuery(undefined, 'asc')

  const {data: tasks, isSuccess} = getTasks
  const {mutate: create} = createTask

  console.log(isSuccess ? tasks : null)

  const {register, handleSubmit, reset} = useForm<ICreateTask>({mode: 'onChange'})

  const onSubmit: SubmitHandler<ICreateTask> = (data) => {
    if (data.title.length > 2) {
      create({
        title: data.title,
        description: data.description,
        dateTime: formattedDate
      })
      reset()
    }
  }

  return (
    <main className={styles.main}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <Field styles={stylesTodolist}
                 name={'title'}
                 register={register}
                 isButton={true}
                 date={date}
                 setDate={setDate}
          />
        </div>
      </form>

    </main>
  );
};