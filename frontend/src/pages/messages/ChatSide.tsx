import {  MoveLeftIcon, PlusIcon, SendIcon } from "lucide-react"
import { NoResults } from "../NoResults"
import type { allUserProps, userProp,  } from "./SidebarMessage"
import { Input } from "../../components/ui/input"
import { useEffect, useRef, useState } from "react"

import { getSocket } from "../../utility/socket"
import { toast } from "react-toastify"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { fetchChatMessage, sendMessages } from "../../api/modules/message.api"
import { Spinner } from "../../components/ui/spinner"

interface messageResponseProp{
  from:string
  newMessage:messageProp,
  
  
}

interface messageProp{
 created_at:string,
    isDelivered:boolean
    isRead:boolean
    message:string
    message_id:string 
    sender:userProp,
    receiver:userProp
}


interface chatResponse{
  success:boolean,
  message:string,
  totalMessages:messageProp[]
}

const ChatSide = ({selectedUser,onBackClick,mobileView}:{selectedUser:allUserProps|undefined,onBackClick:()=>void,mobileView:boolean}) => {

  const [message, setMessage] = useState('');
  // const [, setReceivedMessage] = useState<messageResponse []>([]);
  const queryClient=useQueryClient()
  const socket = getSocket();
  //  const sendMessage = () => {
  //       if(socket){
  //           console.log(selectedUser?.user_id)
  //           console.log(",essage senting")
  //           socket.emit('message', message, selectedUser?.user_id);
  //           setMessage('');
  //       }
  //     };


  const messsageEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!socket) return;

  const handleMessage = (data: messageResponseProp) => {
    console.log(data)
    queryClient.setQueryData(['chatMessages',selectedUser?.user_id],(oldData:chatResponse)=>{
      if(!oldData){
        return {
          success:true,
          message:"Successfully fetched",
          totalMessages:[data.newMessage]
        }
      }
      return {
        ...oldData,
        totalMessages:[...oldData.totalMessages,data.newMessage]
      }
    })
    toast.success(`${data.newMessage.message} from ${data.newMessage.sender.name}`);
    // setReceivedMessage((prevMsg) => [...prevMsg, data]);
  };

  socket.on('message', handleMessage);

  return () => {
    socket.off('message', handleMessage);
  };
    
  }, [queryClient, selectedUser?.user_id, socket]);


    const {data,isPending}=useQuery<chatResponse>({
    queryKey:['chatMessages',selectedUser?.user_id],
    queryFn:({queryKey})=>{
      const [,user_id]=queryKey
      return fetchChatMessage(user_id as string)
    },
    enabled:!!selectedUser?.user_id,
    refetchOnWindowFocus:true

  })

      useEffect(()=>{
        if(messsageEndRef.current && data?.totalMessages){
            messsageEndRef.current.scrollIntoView({behavior:"instant"});
        }
        console.log(data?.totalMessages)
    },[data?.totalMessages]);



  const {mutate}=useMutation({
    mutationFn:({receiverId,message}: { receiverId: string; message: string })=>sendMessages(receiverId,message),
    onSuccess:(response)=>{
      console.log(response)
        // socket?.emit('message', message, selectedUser?.user_id);
      setMessage('');
      queryClient.invalidateQueries({queryKey:["chatMessages",selectedUser?.user_id]})
      
    }
  })


  



  return (

    <div className={`${mobileView?"w-full":"w-3/4"} relative `}>
        {selectedUser===undefined?(<NoResults/>):
        (
        <div className="h-full flex flex-col ">
        <div className="bg-linear-30 from-gray-300 via-gray-400 to-cyan-50 w-full rounded-b-4xl p-4 lg:p-8">
          <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 lg:space-x-6">
            {mobileView&& (<button onClick={onBackClick} className="lg:hidden pl-2 hover:bg-gray-200 rounded-full transition-colors cursor-pointer bg-gray-500 w-8 h-8 flex items-center justify-center pr-2">
              <span><MoveLeftIcon className="w-4 h-4 text-white"/> </span>
            </button>)}


            <img src={selectedUser.profile_pic||"https://randomuser.me/api/portraits/men/32.jpg"} alt={selectedUser.name} className="w-10 h-10 lg:w-14 lg:h-14 rounded-full" />
            <div className="">
              <h3 className="capitalize tracking-wide text-lg lg:text-2xl font-bold ">{selectedUser.name}</h3>
              <div className="relative flex items-center justify-center mt-0.5">
                <div className="absolute top-1 left-0.5 w-2 h-2 lg:w-3 lg:h-3 rounded-full bg-gray-700 "/>
                <p className="capitalize px-4 lg:px-5 text-slate-400 text-xs lg:text-sm">Offline</p>
              </div>
            </div>
          </div>
          <button className="px-3 py-1.5 lg:px-4 lg:py-2 border-2 rounded-4xl border-zinc-700 cursor-pointer text-xs lg:text-sm"> View Profile</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
              {isPending?<div className="flex items-center justify-center"><Spinner/></div>:
              
              <div className="space-y-2 flex flex-col"
              
              >  
                {data?.totalMessages.map((message)=>(

                  <div key={message.message_id} ref={messsageEndRef} className={`max-w-2/5 text-md lg:text-base px-4 py-3 ${message.sender.user_id===selectedUser.user_id?"self-start rounded-[15px] rounded-bl-none bg-white":"self-end rounded-[15px] rounded-br-none bg-lime-100"}`}>
                    {message.message}
                  </div>
                ))}
                
                </div>}
        </div>
        <div className=" w-full bg-gray-400 border-2 border-zinc-600 px-4 lg:px-8 py-3 lg:py-4 flex space-x-2 lg:space-x-3 items-center rounded-t-3xl">
            <PlusIcon className="w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-white p-1.5 cursor-pointer"/>
            <form   className=" w-full flex items-center" onSubmit={(e)=>{ 
              e.preventDefault()
              mutate({receiverId:selectedUser.user_id,message})}}>
            <Input type="text" placeholder="Enter your message" value={message} onChange={(e)=>setMessage(e.target.value)} className="tracking-wider w-full border-0 text-sm lg:text-base"/>
              <div className="relative flex items-center justify-between">
             <SendIcon className="absolute right-3 text-white" size={16} /> 
            <button  disabled={message.trim()==""} type="submit" className=" pl-3 pr-8 lg:pl-4 lg:pr-9 py-1.5 lg:py-2 rounded-3xl text-sm lg:text-md bg-gray-600 text-white border-2 border-zinc-700 cursor-pointer hover:bg-gray-700 transition-colors" >Send</button>
              </div>

            </form>
        </div>
        </div>
        )}


    </div>
  )
}

export default ChatSide