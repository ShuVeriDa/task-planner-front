import {ChangeEvent, createContext} from 'react';
import {ITask} from "../../services/task.type.ts";

interface ITaskContextProps {
  task: ITask
  newTitle: string
  newDescription: string
  newDate: string | any
  isEdit: boolean
  shareNickName: string
  isShare: boolean
  isNotMy?:boolean

  setNewTitle: (newTitle: string) => void
  setNewDescription: (newDescription: string) => void
  setNewDate: (newDate: string | any) => void
  setEdit: (edit: boolean) => void
  setShareNickName: (shareNickName: string) => void
  setIsShare: (isShare: boolean) => void

  changeTitle: (title: string) => void
  changeDescription: (description: string) => void
  onChangeCheckbox: (e: ChangeEvent<HTMLInputElement>) => void
  changeDate: (date: string) => void
  onShareToggle: () => void
  onShareHandler: () => void
  onEditOpen: () => void
  onEditClose: () => void
  onEditHandler: () => void
  onEditVisible: (value: boolean) => void
}

const TaskContext = createContext<ITaskContextProps | undefined>(undefined);

export default TaskContext