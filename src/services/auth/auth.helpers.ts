import {IAuthResponse, ITokens} from "../../redux/user/user.interface";
import Cookies from "js-cookie";

export const getAccessToken = () => {
  const accessToken = Cookies.get('accessToken')
  return accessToken || null
}
export const saveToStorage = (data: IAuthResponse) => {
  saveTokensStorage(data)
  localStorage.setItem('user', JSON.stringify(data.user))
}

export const saveTokensStorage = (data: ITokens) => {
  Cookies.set('accessToken', data.accessToken)
  Cookies.set('refreshToken', data.refreshToken)
}

export const removeFromStorage = () => {
  Cookies.remove('accessToken')
  Cookies.remove('refreshToken')
  localStorage.removeItem('user')
}