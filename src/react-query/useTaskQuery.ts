import {useQuery} from "@tanstack/react-query";
import {TaskService} from "../services/task.service.ts";
import {useMemo} from "react";

export const useTaskQuery = (taskId?: string, order?: 'asc' | 'desc') => {
  const getTasks = useQuery({
    queryFn: () => TaskService.fetchAllTask(order!),
    queryKey: ['allTasks']
  })

  return useMemo(() => ({
    getTasks
  }), [getTasks])
}