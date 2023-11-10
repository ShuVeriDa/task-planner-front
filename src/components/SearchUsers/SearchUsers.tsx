import {ChangeEvent, FC, useState} from 'react';
import styles from './SearchUsers.module.scss';
import {BiSearchAlt2} from "react-icons/bi";
import {useUserQuery} from "../../react-query/useUserQuery.ts";
import {useDebounce} from "../../hooks/useDebounce.ts";
import {formatDate} from "../../utils/formatDate.ts";
import {AiOutlineClose} from "react-icons/ai";

interface ISearchUsersProps {
}

export const SearchUsers: FC<ISearchUsersProps> = () => {
  const [value, setValue] = useState<string | null>('')
  const [nickname, setNickname] = useState(value ? value : '')
  const debounced = useDebounce(setValue, 350)
  const {searchUsers} = useUserQuery(value!.length > 1 ? value : null)
  const {data: users, isSuccess} = searchUsers

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounced(e.currentTarget.value)
    setNickname(e.currentTarget.value)
  }

  const clearValue = () => {
    setValue('')
    setNickname('')
  }


  return (
    <div className={styles.wrapper}>
      <div className={styles.searchComponent}>
        <input className={styles.input}
               type="text"
               value={nickname!}
               placeholder={'Search users...'}
               onChange={onChange}
        />
        <div className={styles.btns}>
          {value!.length === 0
            ? <div className={styles.searchSvg}>
              <BiSearchAlt2/>
            </div>
            : <div className={styles.closeBtn}
                   onClick={clearValue}
            >
              <AiOutlineClose/>
            </div>
          }

        </div>

      </div>
      <div className={styles.users}>
        {isSuccess && users?.map(user => {
          return <div key={user.id}
                      className={styles.task}
          >
            <div className={styles.nickname}>{user.nickname}</div>
            {user.tasks.length > 0 && <div className={styles.infoContainer}>
              <div className={styles.title}>Задачи:</div>
              {user.tasks.map(task => {
                const formattedDate = formatDate(task.dateTime, 'two')
                return <div key={task.id}
                            className={styles.info}
                >
                  <div className={styles.taskTitle}>{task.title}</div>
                  <div className={styles.description}>{task.description}</div>
                  <div className={styles.dateTime}>{formattedDate}</div>
                </div>
              })}
            </div>}
          </div>
        })}
      </div>
    </div>
  );
};