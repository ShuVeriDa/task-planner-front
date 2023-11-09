import {toast} from "react-toastify";
import {ITask} from "../services/task.type.ts";

export const checkTaskDeadlines = (task: ITask) => {
  const now = new Date();
  const deadline = new Date(task.dateTime);

  const timeDiff = deadline.getTime() - now.getTime();

  // Если разница во времени меньше часа (3600000 миллисекунд), отправляем уведомление
  if (timeDiff > 0 && timeDiff <= 3600000) {
    const timeDiffDate = new Date(timeDiff);

    // Получаем разницу в формате часов, минут, секунд
    const hoursDiff = timeDiffDate.getUTCHours();
    const minutesDiff = timeDiffDate.getUTCMinutes();
    const secondsDiff = timeDiffDate.getUTCSeconds();

    // Отправляем уведомление
    toast.warning(`Срок выполнения задачи "${task.title}" через ${hoursDiff} ч ${minutesDiff} мин ${secondsDiff} сек`);
  }
};