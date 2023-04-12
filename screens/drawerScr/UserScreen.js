import { useContext } from 'react';
import {Text} from 'react-native';
import { AdminAuthContext } from '../../store/adminAuth-context';
function UserScreen(){

    const ctx=useContext(AdminAuthContext);
    return(
        <Text>token{ctx.idToken}</Text>
    )
}

export default UserScreen;