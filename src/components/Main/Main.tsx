import {FC} from 'react';
import styles from './Main.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {Field} from "../Task/Field/Field.tsx";
import {ICreateTask} from "../../services/task.type.ts";
import stylesTodolist from '../Task/Field/TaskField.module.scss';
import {useTaskQuery} from "../../react-query/useTaskQuery.ts";

export const Main: FC = () => {
  const {getTasks} = useTaskQuery(undefined, 'asc')

  const {data: tasks, isSuccess} = getTasks
  console.log(isSuccess ? tasks : null)

  const {register, handleSubmit, reset} = useForm<ICreateTask>({mode: 'onChange'})

  const onSubmit: SubmitHandler<ICreateTask> = (data) => {
    if (data.title.length > 2) {

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
          />
        </div>
      </form>

    </main>
  );
};