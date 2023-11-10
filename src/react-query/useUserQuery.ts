import {useQuery} from "@tanstack/react-query";
import {useMemo} from "react";
import {UserService} from "../services/user/user.service.ts";

export const useUserQuery = (nickname?: string | null) => {
  const searchUsers = useQuery({
    queryFn: () => UserService.searchUser(nickname!),
    queryKey: ['allUsers', nickname]
  })

  return useMemo(() => ({
    searchUsers
  }), [searchUsers])
}