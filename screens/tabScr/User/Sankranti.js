import { useEffect,useState } from 'react';
import {View,Text } from 'react-native';
import { fetchSankranti } from '../../../util/http/sankrantiHttp';
import SankrantiList from '../../../components/Sankranti/SankrantiList';

function Sankranti(){
    const [data,setData]=useState(undefined);
    useEffect(()=>{
        async function fetchData(){
            setData(await fetchSankranti())
        }
        fetchData();
    },[])
    let ele
    if(data){
        ele=<SankrantiList dataSet={data}/>
    }else{
        ele='';
    }
    return(<View>
        {ele}
    </View>);


}

export default Sankranti;