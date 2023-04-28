import axios from "axios";

const URL="https://epujeri-d5ced-default-rtdb.firebaseio.com/";
const ID="-NU74zEiQhMZ1O8EdNgo"
export async function updateSankranti(sanData){
    /*const data={
        jan:['',''],
        feb:['',''],
        mar:['',''],
        apr:['',''],
        may:['',''],
        jun:['',''],
        jul:['',''],
        aug:['',''],
        sep:['',''],
        oct:['',''],
        nov:['',''],
        dec:['',''],
    }
    await axios.post(URL+"/sankranti.json",data)*/
    await axios.put(URL+`/sankranti/${ID}.json`,sanData);
}

export async function fetchSankranti(){
    const response=await axios.get(URL+'/sankranti.json');
    let data=response.data[ID]
    return data
}