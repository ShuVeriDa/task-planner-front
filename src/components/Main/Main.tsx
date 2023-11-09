import {FC, useState} from 'react';
import styles from './Main.module.scss';
import './Calendar.scss'
import {SubmitHandler, useForm} from "react-hook-form";
import {Field} from "../Task/Field/Field.tsx";
import {ICreateTask} from "../../services/task.type.ts";
import stylesTodolist from '../Task/Field/TaskField.module.scss';
import {useTaskQuery} from "../../react-query/useTaskQuery.ts";
import {Tasks} from "../Task/Tasks.tsx";
import {formateDate} from "../../utils/formateDate.ts";

export type IDatePiece = Date | null;

export type IValueInput = IDatePiece | [IDatePiece, IDatePiece];

export const Main: FC = () => {
  const [date, setDate] = useState<IValueInput>(new Date())
  const formattedDate = formateDate(date, 'one')

  const {getTasks, createTask} = useTaskQuery(undefined, 'ASC')

  const {data: tasks, isSuccess} = getTasks
  const {mutate: create} = createTask

  console.log(isSuccess ? tasks : null)

  const {register, handleSubmit, reset} = useForm<ICreateTask>({mode: 'onChange'})

  const onSubmit: SubmitHandler<ICreateTask> = (data) => {
    if (data.title.length > 2) {
      create({
        title: data.title,
        description: data.description,
        dateTime: formattedDate!
      })
      reset()
    }
  }

  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Task planner</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.field}>
          <Field styles={stylesTodolist}
                 register={register}
                 isButton={true}
                 date={date}
                 setDate={setDate}
          />
        </div>
      </form>
      <div className={styles.tasks}>
        <Tasks tasks={tasks!}/>
      </div>
    </main>
  );
};