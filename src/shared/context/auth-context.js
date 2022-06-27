import { createContext } from "react";


const AuthContext = createContext({
    isLoggedIn: false,
    login: ()=> {},
    logout: ()=> {},
})

export const {Provider} = AuthContext;

export default AuthContext;