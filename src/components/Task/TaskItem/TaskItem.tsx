import {ChangeEvent, FC, useState} from 'react';
import styles from './TaskItem.module.scss';
import {ITask} from "../../../services/task.type.ts";
import {useTaskQuery} from "../../../react-query/useTaskQuery.ts";
import {TitleAndEdit} from "../TitleAndEdit/TitleAndEdit.tsx";
import stylesUpdate from '../Field/UpdateField.module.scss';

interface ITaskItemProps {
  task: ITask
  isNotMy?:boolean
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
    if(!isShare) {
      setIsShare(true)
    }

    if(isShare) {
      setIsShare(false)
    }
  }
  const onShareHandler = async () => {
    if(!isShare) {
      setIsShare(true)
    }

    if(isShare) {
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
    <div className={styles.taskItem}>
      <div className={styles.checkbox}>
        <input type="checkbox"
               onChange={onChangeCheckbox}
               checked={task.completed}
               disabled={isNotMy}
        />

      </div>
      <TitleAndEdit isEdit={isEdit}
                    isNotMy={isNotMy}
                    onEditOpen={onEditOpen}
                    onEditHandler={onEditHandler}
                    newTitle={newTitle}
                    newDescription={newDescription}
                    newDate={newDate}
                    onEditClose={onEditClose}
                    onShareToggle={onShareToggle}
                    onShareHandler={onShareHandler}
                    task={task}
                    isShare={isShare}
                    styles={styles}
                    changeTitle={changeTitle}
                    changeDescription={changeDescription}
                    changeDate={changeDate}
                    stylesUpdate={stylesUpdate}
                    setShareNickName={setShareNickName}
                    onEditVisible={onEditVisible}
      />
    </div>
  );
};