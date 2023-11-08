import {useAppSelector} from "../redux/store";

export const useAuth = () => useAppSelector(state => state.user)