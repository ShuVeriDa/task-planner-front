import {FC} from 'react';
import styles from './Header.module.scss';
import {SubmitButton} from "../SubmitButton/SubmitButton.tsx";
import {useActions} from "../../hooks/useActions.ts";
import {useAuth} from "../../hooks/useAuth.ts";
interface IHeaderProps {
}

export const Header: FC<IHeaderProps> = () => {
  const {user} = useAuth()
  const {logoutTC} = useActions()
  return (
    <header className={styles.header}>
      <div className={styles.nickname}>{user?.nickname}</div>

        <SubmitButton styles={styles}
                      title={"Logout"}
                      onClick={logoutTC}
        />

    </header>
  );
};