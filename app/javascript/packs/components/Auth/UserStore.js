const UserStore = {
    getUser: ()=> JSON.parse(localStorage.getItem('user')),
    setUser: (user)=>localStorage.setItem('user', JSON.stringify(user)),
    getToken: ()=> JSON.parse(localStorage.getItem('user'))?.auth_token,
}

export default UserStore