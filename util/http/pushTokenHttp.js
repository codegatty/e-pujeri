import axios from "axios";

const URL="https://epujeri-d5ced-default-rtdb.firebaseio.com/";
export async function addTokenToDatabasae(token){
    let isDuplicate=false
    const response= await axios.get(URL+'/tokens.json')
    for (const key in response.data){
        const usedToken=response.data[key].token
        if(usedToken===token){
            isDuplicate=true
            break;
        }
        else
            isDuplicate=false
    }
    if(isDuplicate==false){
    await axios.post(URL+'/tokens.json',{token:token})
    }
}

export async function fetchTokensFromDatabase(){
    const response=await axios.get(URL+'/tokens.json')
    let tokens=[]
    for(const key in response.data){
        tokens.push(response.data[key].token)
    }
    
    return tokens;
}