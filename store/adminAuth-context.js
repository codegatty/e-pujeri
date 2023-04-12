import { useState, createContext } from "react";


export const AdminAuthContext = createContext({
    tokenId: '',
    isAuth: false,
    storeToken: (token) => { },
    logOut:()=>{}
})


function AdminAuthProvider({ children }) {
    const [tokenId, setTokenId] = useState();
    function storeToken(token) {
        setTokenId(token);
    }
    function logOut(){
        setTokenId(null);
    }
    const values = {
        tokenId: tokenId,
        isAuth: !!tokenId,
        storeToken: storeToken,
        logOut:logOut
    }


    return (
        <AdminAuthContext.Provider value={values}>
            {children}
        </AdminAuthContext.Provider>
    );

}

export default AdminAuthProvider;