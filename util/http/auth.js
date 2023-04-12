import axios from 'axios';

const API_CONST='AIzaSyA0Dr7QETl0zUw9tXL_yjLLnP96EWPeTVk';

export async function AuthenticateAdmin(email,password){
const response=await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_CONST}`,
{
    email:email,
    password:password,
    returnSecureToken:true
})
return response.data.idToken;
}