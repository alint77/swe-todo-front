import { useRouter } from "next/router"
import { useEffect, useState } from "react";
import AuthContext from '../../context/AuthContext';

export default function boardPage (props) {


    const[isLoading,setIsLoading]=useState(false)
    const [board,setBoard]=useState({})
    const [members,setMembers]=useState([])
    

    const router=useRouter()

    const fetchBoard = async ()=>{

        setIsLoading(true)

        const res = await fetch(`http://localhost:4000/api/boards/${router.query.id}`,
        {
            method:'GET',
            credentials:'include'
        })
        const data = await res.json()
        console.log(data);
        if(res.ok) {

            setIsLoading(false)
            setBoard({board})
            setMembers({members})
        }
        else(console.log(res.status))
    
      }
    
      useEffect(()=>{
        fetchBoard()
      },[])

    if(isLoading) return(
        <div>loading...</div>
    )
    return(
        <div>
            asdasd{board.board}
        </div>
    )
};
