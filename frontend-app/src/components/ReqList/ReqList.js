import React,{useState} from "react";
function ReqList({req,setReq}){

    const [edit,setEdit]=useState(null)
    const [value,setValue]=useState('')

    function deleteReq(id){
        let newReq =[...req].filter(item => item.id!=id)
        setReq(newReq)
    }

    function editReq(id,title){
        setEdit(id)
        setValue(title)
    }

    function saveReq(id){

        let newReq=[...req].map(item=>{
            if(item.id==id){
                item.title=value
            }
            return item
        }   
        )
        setReq(newReq)
        setEdit(null)
    }

    return(
        <div>
        {
            req.map(item=>(
                <div key={item.id}>
                    {
                        edit==item.id ? 
                        <div>
                            <input onChange={(e)=>setValue(e.target.value)} value={value}></input>
                        </div>
                        :
                        <div>{item.title}</div>

                        
                    }
                    {
                        edit==item.id ? 
                        <div>
                            <button onClick={()=>saveReq(item.id)}>Сохранить</button>
                        </div>
                        :
                        <div>
                    <button onClick={()=>deleteReq(item.id)}>Удалить</button>
                    <button onClick={()=>editReq(item.id,item.title)}>Редактировать</button>
                        </div>

                        
                    }
                </div>
            ))
        }
        </div>
    )
}
export default ReqList;