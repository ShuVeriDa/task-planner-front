import {ChangeEvent, FC, useState} from 'react';
import styles from './TaskItem.module.scss';
import {ITask} from "../../../services/task.type.ts";
import {useTaskQuery} from "../../../react-query/useTaskQuery.ts";
import {TitleAndEdit} from "../TitleAndEdit/TitleAndEdit.tsx";
import stylesUpdate from '../Field/UpdateField.module.scss';
import TaskContext from "../../TaskContext/TaskContextProvider.tsx";

interface ITaskItemProps {
  task: ITask
  isNotMy?: boolean
}

export const TaskItem: FC<ITaskItemProps> = ({task, isNotMy}) => {
  const {updateTask, shareTask} = useTaskQuery(task.id)
  const {mutate: share} = shareTask
  const {mutateAsync: editTask} = updateTask

  const [newTitle, setNewTitle] = useState(task.title)
  const [newDescription, setNewDescription] = useState(task.description)
  const [newDate, setNewDate] = useState(task.dateTime)
  const [isEdit, setEdit] = useState(false)
  const [shareNickName, setShareNickName] = useState('')
  const [isShare, setIsShare] = useState(false)

  const changeTitle = (title: string) => setNewTitle(title)
  const changeDescription = (description: string) => setNewDescription(description)
  const onChangeCheckbox = async (e: ChangeEvent<HTMLInputElement>) => {
    await editTask({completed: e.currentTarget.checked})
  }
  const changeDate = (date: string) => setNewDate(date)
  const onShareToggle = () => {
    if (!isShare) {
      setIsShare(true)
    }

    if (isShare) {
      setIsShare(false)
    }
  }
  const onShareHandler = () => {
    if (!isShare) {
      setIsShare(true)
    }

    if (isShare) {
      share({nickname: shareNickName})
      setIsShare(false)
    }
  }
  const onEditOpen = () => setEdit(true)
  const onEditClose = () => {
    setNewTitle(task.title)
    setNewDescription(task.description)
    setNewDate(task.dateTime)
    setEdit(false)
  }
  const onEditHandler = async () => {
    if (!isEdit) {
      onEditOpen()
    }
    if (isEdit) {
      await editTask({title: newTitle, description: newDescription, dateTime: newDate})
      setEdit(false)
    }
  }

  const onEditVisible = async (value: boolean) => {
    await editTask({isVisible: value})
  }

  return (
    <TaskContext.Provider value={{
      task, newTitle, newDescription, newDate, isEdit, shareNickName, isShare, isNotMy,
      setNewTitle, setNewDescription, setNewDate, setEdit, setShareNickName,
      setIsShare, changeTitle, changeDescription, onChangeCheckbox, changeDate, onShareToggle,
      onShareHandler, onEditOpen, onEditClose, onEditHandler, onEditVisible
    }}>
      <div className={styles.taskItem}>
        <div className={styles.checkbox}>
          <input type="checkbox"
                 onChange={onChangeCheckbox}
                 checked={task.completed}
                 disabled={isNotMy}
          />
        </div>
        <TitleAndEdit
          styles={styles}
          stylesUpdate={stylesUpdate}
        />
      </div>
    </TaskContext.Provider>

  );
};