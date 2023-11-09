import {FC, useEffect} from 'react';
import {Field} from "../Field/Field.tsx";
import {MdModeEditOutline} from "react-icons/md";
import {FaTrashAlt} from "react-icons/fa";
import {FcCancel} from "react-icons/fc";
import {ITask} from "../../../services/task.type.ts";
import {formateDate} from "../../../utils/formateDate.ts";
import {TbShare3} from "react-icons/tb";
import {useTaskQuery} from "../../../react-query/useTaskQuery.ts";
import {AiOutlineSend} from "react-icons/ai";
import {checkTaskDeadlines} from "../../../utils/checkTaskDeadlines.ts";

interface ITitleAndEditProps {
  styles?: { readonly [key: string]: string }
  stylesUpdate?: { readonly [key: string]: string }
  changeTitle: (title: string) => void
  changeDescription: (description: string) => void
  changeDate: (date: string) => void
  isEdit: boolean
  onEditOpen: () => void
  onShareToggle: () => void
  onShareHandler: () => void
  onEditHandler: () => void
  setShareNickName: (shareNickName: string) => void
  onEditVisible: (value: boolean) => void
  task: ITask
  newTitle: string
  newDescription: string
  newDate: string
  onEditClose: () => void
  isNotMy?: boolean
  isShare?: boolean
}

export const TitleAndEdit: FC<ITitleAndEditProps> = (
  {
    isShare,
    onShareToggle,
    onShareHandler,
    onEditVisible,
    setShareNickName,
    isNotMy,
    newDate,
    changeDate,
    task,
    changeDescription,
    newDescription,
    isEdit,
    styles,
    onEditOpen,
    newTitle,
    stylesUpdate,
    changeTitle,
    onEditHandler,
    onEditClose
  }
) => {
  const formattedDate = formateDate(task.dateTime, 'two')
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
          ? <Field styles={stylesUpdate}
                   titleValue={newTitle}
                   date={newDate}
                   setDate={changeDate}
                   descriptionValue={newDescription}
                   onChangeTitle={changeTitle}
                   onChangeDescription={changeDescription}
          />
          : <div className={styles?.info}>
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
        }
        {!isNotMy && isShare && <div className={styles?.shareInput}>
          <input type="text"
                 placeholder={'Введите nickname пользователя'}
                 onChange={(e) => setShareNickName(e.currentTarget.value)}
          />
          <div className={styles?.send}
               onClick={onShareHandler}>
            <AiOutlineSend/>
          </div>
        </div>}
      </div>
      {!isNotMy && <div className={styles?.btn}>
        <div className={styles?.edit}
             onClick={onEditHandler}
        >
          <MdModeEditOutline/>
        </div>
        {!isEdit
          ? <div className={styles?.remove} onClick={onRemove}><FaTrashAlt/></div>
          : <div className={styles?.cancel} onClick={onEditClose}><FcCancel/></div>
        }
        <div className={styles?.share}
             onClick={onShareToggle}
        >
          <TbShare3/>
        </div>
      </div>
      }
    </>
  )
    ;
};