import {FC, useContext, useEffect} from 'react';
import {useTaskQuery} from "../../../react-query/useTaskQuery.ts";
import {checkTaskDeadlines} from "../../../utils/checkTaskDeadlines.ts";
import TaskContext from "../../TaskContext/TaskContextProvider.tsx";
import {Edit} from "../Edit/Edit.tsx";
import {Info} from "../Info/Info.tsx";
import {Btns} from "../Btns/Btns.tsx";
import {ShareInput} from "../ShareInput/ShareInput.tsx";

interface ITitleAndEditProps {
  styles?: { readonly [key: string]: string }
  stylesUpdate?: { readonly [key: string]: string }
}

export const TitleAndEdit: FC<ITitleAndEditProps> = (
  {styles, stylesUpdate,}
) => {
  const {
    task, onEditOpen, isEdit, isNotMy, isShare} = useContext(TaskContext)!


  const {deleteTask} = useTaskQuery()

  const {mutate: removeTask} = deleteTask

  const onRemove = () => {
    removeTask(task.id)
  }

  useEffect(() => {
    checkTaskDeadlines(task);
  }, []);

  return (
    <>
      <div className={styles?.title}
           onDoubleClick={onEditOpen}
      >
        {isEdit && !isNotMy
          ? <Edit stylesUpdate={stylesUpdate}/>
          : <Info styles={styles}/>
        }
        {!isNotMy && isShare && <ShareInput styles={styles}/>}
      </div>
      {!isNotMy && <Btns styles={styles} onRemove={onRemove}/>
      }
    </>
  )
    ;
};