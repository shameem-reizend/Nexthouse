import { Flower } from "lucide-react"
import type { inviteProp } from "../pages/invitations/MyInvitations"
import { useState } from "react"

const InviteCard = ({invite}:{invite:inviteProp}) => {
    const [date,]=useState(new Date(invite.event.event_date))
  return (
    <div className="w-full max-w-sm mx-auto sm-mx-0 rounded-2xl bg-linear-to-br from-zinc-50 to bg-zinc-200 shadow-md overflow-hidden">
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
            <div className="text-5xl sm:text-6xl font-bold">{date.getDate()}</div>
            <div className="flex flex-col text-xl sm:text-2xl">
                <div>{date.toLocaleString("en-us",{month:"long"})}</div>
                <div>{date.getFullYear()}</div>
            </div>
        </div>
         <hr className="w-3/4 h-0.5 my-3 bg-gray-600 border-0 rounded-sm "/>
            <div className="text-lg sm:text-xl font-bold tracking-wide text-blue-400 text-center sm:text-left">
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




// import { Flower } from "lucide-react"
// import type { inviteProp } from "../pages/invitations/MyInvitations"
// import { useState, useEffect } from "react"

// const InviteCard = ({ invite }: { invite: inviteProp }) => {
//     const [date, setDate] = useState<Date | null>(null);

//     useEffect(() => {
//         if (invite.event.event_date) {
//             setDate(new Date(invite.event.event_date));
//         }
//     }, [invite.event.event_date]);

//     if (!date) {
//         return <div>Loading...</div>;
//     }

//     return (
//         <div className="w-full max-w-sm mx-auto sm:mx-0 rounded-2xl bg-gradient-to-br from-zinc-50 to-zinc-200 shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
//             <div className="flex flex-col justify-center items-center p-6">
//                 {/* Header */}
//                 <div className="flex items-center gap-2 mb-4">
//                     <Flower className="text-blue-600 w-8 h-8" />
//                     <div className="text-2xl uppercase font-bold tracking-wider text-slate-600">
//                         Nexthouse
//                     </div>
//                 </div>

//                 {/* Event Details */}
//                 <div className="flex flex-col items-center w-full">
//                     <div className="text-base uppercase text-gray-600 mb-2">
//                         You're invited to
//                     </div>
                    
//                     <hr className="w-3/4 h-0.5 my-3 bg-gray-400 border-0 rounded" />
                    
//                     <h2 className="text-2xl sm:text-3xl uppercase text-blue-600 tracking-wider font-serif text-center font-bold mb-2">
//                         {invite.event.event_name}
//                     </h2>
                    
//                     <hr className="w-3/4 h-0.5 my-3 bg-gray-400 border-0 rounded" />
                    
//                     <p className="px-4 sm:px-6 text-sm sm:text-base text-gray-700 leading-relaxed text-center mb-4">
//                         {invite.event.event_description}
//                     </p>
                    
//                     <hr className="w-3/4 h-0.5 my-3 bg-gray-400 border-0 rounded" />
                    
//                     {/* Date Section */}
//                     <div className="flex items-center justify-center gap-6 py-4">
//                         <div className="text-5xl sm:text-6xl font-bold text-blue-500">
//                             {date.getDate().toString().padStart(2, '0')}
//                         </div>
//                         <div className="flex flex-col text-lg sm:text-xl text-blue-600 font-medium">
//                             <div>{date.toLocaleString("en-us", { month: "long" })}</div>
//                             <div>{date.getFullYear()}</div>
//                         </div>
//                     </div>
                    
//                     <hr className="w-3/4 h-0.5 my-3 bg-gray-400 border-0 rounded" />
                    
//                     {/* Venue */}
//                     <div className="text-lg font-semibold text-blue-500 text-center mb-2">
//                         📍 {invite.event.event_venue}
//                     </div>
                    
//                     <hr className="w-3/4 h-0.5 my-3 bg-gray-400 border-0 rounded" />
                    
//                     {/* Invited By */}
//                     <div className="self-end text-sm text-blue-500 font-medium mt-4">
//                         Invited by: {invite.sender.name}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default InviteCard