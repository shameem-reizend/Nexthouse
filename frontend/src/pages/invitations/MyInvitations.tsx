import { useQuery } from "@tanstack/react-query"
import { fetchInvitationsApi } from "../../api/modules/invite.api"
import InviteCard from "../../components/InviteCard"
import { NoResults } from "../NoResults"





export interface inviteProp{
    invite_id:string,
    event:EventProp,
    sender:SenderProp
}
interface EventProp{
    event_id:string,
    event_name:string,
    event_description:string,
    event_date:string,
    event_venue:string,
    event_status:string,
    created_at:string
}

interface SenderProp{
    user_id:string,
    name:string
}
const MyInvitations = () => {

    const {data,isLoading,error}=useQuery({
        queryKey:["invitations"],
        queryFn:fetchInvitationsApi,
        staleTime:10000
    })

    if(isLoading) return <div>Loading...</div>
    if(error) return <div>{error.message}</div>
    if(data) console.log(data)
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-4">
        <div className="mb-4 font-semibold text-2xl md:text-left sm:text-center ">My Invitation</div>
        {data.data.length===0?<div className="bg-white rounded-2xl"><NoResults/></div>:
        <div className="grid gap-6 sm:gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.data.map((invite:inviteProp)=>{
            return (
                <InviteCard key={invite.invite_id} invite={invite}/>
            )
        })}
        </div>
}
    </div>
  )
}

export default MyInvitations