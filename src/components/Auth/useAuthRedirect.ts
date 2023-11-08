import {useAuth} from "../../hooks/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export const useAuthRedirect = () => {
  const navigate = useNavigate()
  const {user} = useAuth()

  useEffect(() => {
    if (user) {
      navigate('/')
    }
  }, [user])
}