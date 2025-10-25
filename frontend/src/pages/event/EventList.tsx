import React from 'react';
import { MapPin } from 'lucide-react';
import { NoResults } from '../NoResults';
interface ActivePropType{
    active: "scheduled" | "completed";
    events: Event[],
}

interface Event{
    event_id: string,
    event_name: string,
    event_description: string,
    event_status: string,
    event_venue: string,
    event_date: Date,
}

export const EventList: React.FC<ActivePropType> = ({active, events}) => {
    console.log(active)
    const filteredEvents = events.filter((event: Event) => event.event_status == active )

  return (
    <div>
        {filteredEvents.length != 0 ?
        filteredEvents.map((event: Event) => (
            <div 
                key={event.event_id}
                className="flex flex-col sm:flex-row items-start justify-between sm:items-center bg-white dark:bg-zinc-900 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-5 mb-3"
            >
                <div>
                    <div className="flex items-start space-x-4">
                        <div className="shrink-0 text-center bg-zinc-900 rounded-lg p-3 min-w-16">
                            <div className="text-white  font-bold text-lg">
                            {new Date(event.event_date).getDate()}
                            </div>
                            <div className="text-white text-xs uppercase">
                            {new Date(event.event_date).toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                            {event.event_name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1 line-clamp-1">
                            {event.event_description}
                            </p>
                            <div className="flex items-center text-gray-500 text-sm mt-2">
                                <MapPin width={20}/>
                                <span className="truncate pl-1">{event.event_venue}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <button className="bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-500 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer">
                        Invite
                    </button>
                </div>
            </div>
        ))
        : <NoResults />
        }
    </div>
  )
}
