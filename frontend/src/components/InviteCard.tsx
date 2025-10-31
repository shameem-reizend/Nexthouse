import { Flower } from "lucide-react"
import type { inviteProp } from "../pages/invitations/MyInvitations"
import { useState } from "react"

const InviteCard = ({invite}:{invite:inviteProp}) => {
    const [date,]=useState(new Date(invite.event.event_date))
  return (
    <div className="w-full max-w-sm mx-auto sm-mx-0 rounded-2xl bg-linear-to-br from-zinc-50 to bg-zinc-200 shadow-md overflow-hidden hover:scale-105 transition-all duration-300">
        <div className="flex flex-col justify-center items-center p-4">
            <div className="flex items-center justify-center gap-2">

                <Flower className="w-10 h-10 text-blue-400 "/>
            <div className="text-2xl uppercase font-bold tracking-wider text-slate-600 pt-2">
                Nexthouse
            </div>
            </div>
        <div className="flex flex-col items-center w-full mt-6">
        <div className="text-base uppercase text-center">
            We are inviting you for 
        </div>
            <hr className="w-3/4 h-0.5 my-3 bg-gray-600 border-0 rounded-sm "/>
        <div className="text-2xl sm:text-3xl uppercase text-blue-600 tracking-wider font-serif text-center">
            {invite.event.event_name}
        </div>
        <hr className="w-3/4 h-0.5 my-3 bg-gray-600 border-0 rounded-sm"/>
        <div className="px-10 text-sm sm:text-base tracking-wider leading-6 text-center">
            {invite.event.event_description}
        </div>
            <hr className="w-3/4 h-0.5 my-3 bg-gray-600 border-0 rounded-sm"/>
        <div className="flex sm:flex-col md:flex-row justify-center items-center pt-3 sm:space-x-0 sm:space-y-1 gap-3 text-blue-400">
            <div className="text-5xl sm:text-6xl font-bold">{date.getDate().toString().padStart(2, '0')}</div>
            <div className="flex flex-col text-xl sm:text-2xl">
                <div>{date.toLocaleString("en-us",{month:"long"})}</div>
                <div>{date.getFullYear()}</div>
            </div>
        </div>
         <hr className="w-3/4 h-0.5 my-3 bg-gray-600 border-0 rounded-sm "/>
            <div className="text-lg sm:text-xl font-bold tracking-wide text-blue-400 text-center sm:text-left uppercase">
                Venue: {invite.event.event_venue}
            </div>
        <hr className="w-3/4 h-0.5 my-3 bg-gray-600 border-0 rounded-sm "/>
        <div className="self-end uppercase text-blue-400 font-medium text-sm mt-4">
            Invited By: {invite.sender.name}
        </div>
        </div >

        </div>
    </div>
  )
}

export default InviteCard

