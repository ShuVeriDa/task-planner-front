import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {TaskService} from "../services/task.service.ts";
import {useMemo} from "react";
import {ICreateTask} from "../services/task.type.ts";

export const useTaskQuery = (taskId?: string, order?: 'asc' | 'desc') => {
  const getTasks = useQuery({
    queryFn: () => TaskService.fetchAllTask(order!),
    queryKey: ['allTasks']
  })

  const client = useQueryClient()

  const createTask = useMutation({
    mutationFn: (data: ICreateTask) => TaskService.createTask(data),
    onSuccess: () => {
      client.invalidateQueries({queryKey: ['allTasks']})
    }
  })

  return useMemo(() => ({
    getTasks, createTask
  }), [getTasks, createTask])
}