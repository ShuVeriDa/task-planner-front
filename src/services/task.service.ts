import {instance} from "../api/api.interceptor.ts";
import {getTasksUrl} from "../api/api.config.ts";
import {IAllTaskResponse, ICreateTask, IShareTask, ITask, IUpdateTask} from "./task.type.ts";

export const TaskService = {
  fetchAllTask: async (order: "ASC" | 'DESC') => {
    const res = await instance.get<IAllTaskResponse>(getTasksUrl(`?order=${order}`))
    return res.data
  },

  createTask: async (data: ICreateTask) => {
    const res = await instance.post<ITask>(getTasksUrl(''), data)
    return res.data
  },

  updateTask: async (taskId: string, data: IUpdateTask) => {
    const res = await instance.patch<ITask>(getTasksUrl(`/${taskId}`), data)
    return res.data
  },

  shareTask: async (taskId: string, data: IShareTask) => {
    const res = await instance.post<ITask>(getTasksUrl(`/share/${taskId}`), data)
    return res.data
  },

  deleteTask: async (taskId: string) => {
    const res = await instance.delete(getTasksUrl(`/${taskId}`))
    return res.data
  }
}
