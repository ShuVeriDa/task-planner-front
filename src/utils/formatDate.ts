import {format} from "date-fns-tz";
import {ru} from 'date-fns/locale'

export const formatDate = (date: any, variant: "one" | "two") => {
  const originalDate = new Date(date!.toString());

  if(variant === 'one') {
    return format(originalDate, "yyyy-MM-dd HH:mm", {timeZone: 'Europe/Moscow'})
  }
  if(variant === 'two') {
    return format(originalDate, "HH:mm dd MMM yyyy", {timeZone: 'Europe/Moscow', locale: ru} )
  }
}