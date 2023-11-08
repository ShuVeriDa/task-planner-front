import {ChangeEvent, FC} from 'react';
import styles from './TaskItem.module.scss';
import {ITask} from "../../../services/task.type.ts";
import {formateDate} from "../../../utils/formateDate.ts";
import {useTaskQuery} from "../../../react-query/useTaskQuery.ts";

interface ITaskItemProps {
  task: ITask
}

export const TaskItem: FC<ITaskItemProps> = ({task}) => {
  const formattedDate = formateDate(task.dateTime, 'two')

  const {updateTask} = useTaskQuery(task.id)
  const {mutateAsync: editTask} = updateTask

  const onChangeCheckbox = async (e: ChangeEvent<HTMLInputElement>) => {
    await editTask({completed: e.currentTarget.checked})
  }

  return (
    <div className={styles.taskItem}>
      <div className={styles.checkbox}>
        <input type="checkbox" onChange={onChangeCheckbox} checked={task.completed}/>
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <div className={styles.title}>{task.title}</div>
          <div className={styles.description}>{task.description}</div>
        </div>

        <div className={styles.date}> {formattedDate}</div>
      </div>

    </div>
  );
};