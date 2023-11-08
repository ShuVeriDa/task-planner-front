import {StatusEnum} from "../../redux/types";
import cn from "clsx";
import {FC} from "react";

interface ISubmitButtonProps {
  title: string
  status?: StatusEnum
  onClick?: () => void
  classes?: string
  styles?: { readonly [key: string]: string }
  disabled?: boolean
}

export const SubmitButton: FC<ISubmitButtonProps> = ({title, classes, styles, status, onClick, disabled}) => {
  const isLoading = status === 'success'
  return (
    <>
      <button type={'submit'}
              onClick={onClick}
              className={cn(styles?.btn, classes)}
              disabled={status ? isLoading : disabled}
      >
        {title}
      </button>
    </>
  );
};