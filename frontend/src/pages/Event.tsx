import React, { useState } from 'react';
import {PlusCircle} from 'lucide-react'
import { EventList } from './EventList';

type active = "scheduled" | "completed"

export const Event: React.FC = () => {

    const [active, setActive] = useState<active>("scheduled")

  return (
    <div>
        <div className="flex w-full justify-between">
            <div className="text-3xl font-bold font-sans">
                My Events
            </div>
            <div>
                <button className="bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-500 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer">
                    <span><PlusCircle/></span>Add Event
                </button>
            </div>
        </div>

        <div className="flex items-center gap-5 mt-5">
            <div onClick={() => setActive("scheduled")} className={`bg-white hover:bg-zinc-700 active:bg-zinc-500 hover:text-white px-4 py-2 rounded-lg font-medium cursor-pointer shadow-2xl 
                ${active == "scheduled"? "bg-zinc-900 text-white" : "bg-white"}`}>
                Scheduled
            </div>
            <div onClick={() => setActive("completed")} className={`bg-white hover:bg-zinc-700 active:bg-zinc-500 hover:text-white px-4 py-2 rounded-lg font-medium cursor-pointer shadow-2xl 
                ${active == "completed"? "bg-zinc-900 text-white" : "bg-white"}`}>
                Completed
            </div>
        </div>

        <div className="card shadow-2xl p-5 bg-white rounded-xl mt-5">
            <EventList active={active}/>
        </div>
    </div>
    
  )
}
