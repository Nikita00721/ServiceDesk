import React,{useState} from "react";
function AddReq({req,setReq}){

    const [value,setValue]=useState('')

    function addReq(){
        setReq(
            [...req,{
                id:4,
                title:value,
                status:true
            }]
        )
        setValue('')
    }
    return(
        <div>
        <input placeholder="Введите что-нибудь" value={value} onChange={(e)=>setValue(e.target.value)}></input>
        <button onClick={addReq}>Добавить</button>
        </div>
    )
}
export default AddReq;