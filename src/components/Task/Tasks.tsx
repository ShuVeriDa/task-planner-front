import {FC} from 'react';
import styles from './Tasks.module.scss';
import {IAllTaskResponse} from "../../services/task.type.ts";
import {TaskItem} from "./TaskItem/TaskItem.tsx";

interface ITaskProps {
  tasks: IAllTaskResponse | null
}

export const Tasks: FC<ITaskProps> = ({tasks}) => {
  return (
    <div className={styles.tasks}>
      <h2>My tasks</h2>
      {tasks?.myTasks.map(task => <TaskItem key={task.id} task={task}/>)}
      <h2>Доступные задачи других пользователей</h2>
      {tasks?.availableTasks.map(task => <TaskItem key={task.id} task={task} isNotMy={true}/>)}
    </div>
  );
};