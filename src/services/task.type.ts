export interface ITodolist {
  id: string
  title: string
  tasks: ITask[]
}

export interface IUserLess {
  id: string
  nickname: string
}

export interface IAllTaskResponse {
  availableTasks: ITask[]
  myTasks: ITask[]
}


export interface ITask {
  id: string
  title: string
  description: string
  completed: boolean
  isVisible: boolean
  createdAt: string
  updatedAt: string
  user: IUserLess
  grantedAccess?: IUserLess[]
}
//
// export interface ICreateTodolist {
//   title: string
// }
//
// export interface IUpdateTodolist extends ICreateTodolist{}
// export interface IUpdateTask {
//   text?: string
//   completed?: boolean
//   todolistId: string;
// }

export interface ICreateTask {
  title: string;
  description: string;
  dateTime: string
}