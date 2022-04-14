export const setRefreshToken = (value) => {
  localStorage.setItem('refresh', value)
}

export const deleteRefreshToken = () => {
  localStorage.removeItem('refresh')
}

export const getRefreshToken = () => {
  return localStorage.getItem('refresh')
}
