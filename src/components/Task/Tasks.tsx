import {FC} from 'react';
import styles from './Tasks.module.scss';
import {IAllTaskResponse} from "../../services/task.type.ts";
import {TasksContainer} from "./TasksContainer.tsx";
import {NotFound} from "../NotFound/NotFound.tsx";

interface ITaskProps {
  tasks: IAllTaskResponse | null
}

export const Tasks: FC<ITaskProps> = ({tasks}) => {
  const isTasks = tasks?.myTasks.length === 0 && tasks?.availableTasks.length === 0
  return (
    <div className={styles.tasks}>
     <>
          {tasks?.myTasks.length !== 0 && <TasksContainer tasks={tasks?.myTasks}
                                                          isNotMy={false}
                                                          title={'Мои задачи'}
          />}
          {tasks?.availableTasks.length !== 0 && <TasksContainer tasks={tasks?.availableTasks}
                                                                 isNotMy={true}
                                                                 title={'Доступные задачи других пользователей'}
          />}
        </>
      {isTasks && <NotFound/>}

    </div>
  );
};