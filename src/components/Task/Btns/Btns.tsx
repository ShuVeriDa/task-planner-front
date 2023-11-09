import {FC, useContext} from 'react';
import {MdModeEditOutline} from "react-icons/md";
import {FaTrashAlt} from "react-icons/fa";
import {FcCancel} from "react-icons/fc";
import {TbShare3} from "react-icons/tb";
import TaskContext from "../../TaskContext/TaskContextProvider.tsx";

interface IBtnsProps {
  styles?: { readonly [key: string]: string }
  onRemove: () => void
}

export const Btns: FC<IBtnsProps> = ({styles, onRemove}) => {
  const {onEditHandler, isEdit, onEditClose, onShareToggle} = useContext(TaskContext)!
  return (
    <div className={styles?.btn}>
      <div className={styles?.edit}
           onClick={onEditHandler}
      >
        <MdModeEditOutline/>
      </div>
      {!isEdit
        ? <div className={styles?.remove} onClick={onRemove}><FaTrashAlt/></div>
        : <div className={styles?.cancel} onClick={onEditClose}><FcCancel/></div>
      }
      <div className={styles?.share}
           onClick={onShareToggle}
      >
        <TbShare3/>
      </div>
    </div>
  );
};