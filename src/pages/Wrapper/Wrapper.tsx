import {FC} from 'react';
import styles from './Wrapper.module.scss';
import {Header} from "../../components/Header/Header.tsx";
import {Main} from "../../components/Main/Main.tsx";

interface IMainProps {
}

export const Wrapper: FC<IMainProps> = () => {
  return (
    <div className={styles.wrapper}>
      <Header/>
      <Main/>
    </div>
  );
};