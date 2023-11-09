import {FC, useContext} from 'react';
import {Field} from "../Field/Field.tsx";
import TaskContext from "../../TaskContext/TaskContextProvider.tsx";

interface IEditProps {
  stylesUpdate?: { readonly [key: string]: string }
}

export const Edit: FC<IEditProps> = ({stylesUpdate}) => {
const {newDate, newTitle, changeDate, newDescription, changeTitle, changeDescription} = useContext(TaskContext)!
  return (
    <Field styles={stylesUpdate}
           titleValue={newTitle}
           date={newDate}
           setDate={changeDate}
           descriptionValue={newDescription}
           onChangeTitle={changeTitle}
           onChangeDescription={changeDescription}
    />
  );
};