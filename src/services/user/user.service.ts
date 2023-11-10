import {instance} from "../../api/api.interceptor.ts";
import {getUsersUrl} from "../../api/api.config.ts";
import {ISearchUserResponse} from "../../redux/user/user.interface.ts";

export const UserService = {
  searchUser: async (nickname?: string) => {
    const res = await instance.get<ISearchUserResponse>(getUsersUrl(`?nickname=${nickname}`))
    return res.data.users
  },
}
