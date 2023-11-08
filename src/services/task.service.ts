import {instance} from "../api/api.interceptor.ts";
import {getTasksUrl} from "../api/api.config.ts";
import {IAllTaskResponse, ICreateTask, ITask} from "./task.type.ts";

export const TaskService = {
  fetchAllTask: async (order: "asc" | 'desc') => {
    const res = await instance.get<IAllTaskResponse>(getTasksUrl(`?order=${order}`))
    return res.data
  },

  createTask: async (data: ICreateTask) => {
    const res = await instance.post<ITask>(getTasksUrl(''), data)
    return res.data
  }
}
