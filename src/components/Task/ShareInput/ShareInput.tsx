import {FC, useContext} from 'react';
import {AiOutlineSend} from "react-icons/ai";
import TaskContext from "../../TaskContext/TaskContextProvider.tsx";

interface IShareInputProps {
  styles?: { readonly [key: string]: string }
}

export const ShareInput: FC<IShareInputProps> = ({styles}) => {
  const {setShareNickName, onShareHandler} = useContext(TaskContext)!
  return (
    <div className={styles?.shareInput}>
      <input type="text"
             placeholder={'Введите nickname пользователя'}
             onChange={(e) => setShareNickName(e.currentTarget.value)}
      />
      <div className={styles?.send}
           onClick={onShareHandler}>
        <AiOutlineSend/>
      </div>
    </div>
  );
};