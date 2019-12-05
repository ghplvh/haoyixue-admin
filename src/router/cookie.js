import Cookies from 'js-cookie'

const userInfo = 'userInfo'

export const getUserInfo = () => {
  let user = Cookies.get(userInfo)
  if (user) user = JSON.parse(user)
  return user
}

export const setUserInfo = info => {
  return Cookies.set(userInfo, JSON.stringify(info))
}

export const removeUserInfo = () => {
  return Cookies.remove(userInfo)
}