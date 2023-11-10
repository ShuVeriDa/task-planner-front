import {FC} from 'react';
import {TaskItem} from "./TaskItem/TaskItem.tsx";
import {ITask} from "../../services/task.type.ts";

interface IMyTasksProps {
  tasks: ITask[] | undefined
  isNotMy: boolean
  title: string
}

export const TasksContainer: FC<IMyTasksProps> = ({tasks, isNotMy, title}) => {
  return (
    <>
      <h2>{title}</h2>
      {tasks?.map(task => <TaskItem key={task.id} task={task} isNotMy={isNotMy}/>)}
    </>
  );
};