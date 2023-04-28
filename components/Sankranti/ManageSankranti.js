import { useEffect,useState } from "react";

import { Text,View } from "react-native";

import SankrantiForm from "./SankrantiForm";
import { fetchSankranti, updateSankranti } from "../../util/http/sankrantiHttp";

function ManageSankranti(){
    const [data,setData]=useState(undefined)
useEffect(()=>{
    async function fetchSankrantiHandler(){
        setData( await fetchSankranti());
    }
    fetchSankrantiHandler();
},[])

    async function sankrantiDataHandler(upData){
        await updateSankranti(upData);
        
}
//Temperary solution please upgrade to context if you can .it is the efficient method
let ele
if(!data){
    ele='';
}else{
    ele=<SankrantiForm onSubmit={sankrantiDataHandler} sanData={data}/>
}
return(

    <View>
    {
        ele
    }
    </View>
    
);

}

export default ManageSankranti;