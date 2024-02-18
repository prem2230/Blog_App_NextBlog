export const setToken = (token)=>{
    sessionStorage.setItem('accessToken',token)
}

export const getToken = ()=>{
    return sessionStorage.getItem('accessToken')
}