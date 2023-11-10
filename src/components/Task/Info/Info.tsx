import {FC, useContext} from 'react';
import TaskContext from "../../TaskContext/TaskContextProvider.tsx";
import {formatDate} from "../../../utils/formatDate.ts";

interface IInfoProps {
  styles?: { readonly [key: string]: string }
}

export const Info: FC<IInfoProps> = ({styles}) => {
  const {task, isNotMy, onEditVisible} = useContext(TaskContext)!
  const formattedDate = formatDate(task.dateTime, 'two')


  return (
    <div className={styles?.info}>
      {isNotMy && <span className={styles?.nickname}>{task.user.nickname}</span>}
      <span className={styles?.title}>{task.title}</span>
      <span className={styles?.description}>{task.description}</span>
      {!isNotMy && <span className={styles?.isVisible}>
                Показать другим пользователя:
                <input type="checkbox"
                       onChange={(e) => onEditVisible(e.currentTarget.checked)}
                       checked={task.isVisible}
                />
                </span>
      }
      <span className={styles?.date}>{formattedDate}</span>
    </div>
  );
};