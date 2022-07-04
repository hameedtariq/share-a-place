import { createContext } from "react";


const AuthContext = createContext({
    isLoggedIn: false,
    token: null,
    login: ()=> {},
    logout: ()=> {},
})

export const {Provider} = AuthContext;

export default AuthContext;