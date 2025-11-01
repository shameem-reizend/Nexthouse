import { useEffect, useState } from "react";
import {
  deleteEventAPI,
  fetchAllEventsAPI,
} from "../../../api/modules/event.api";
import { MetricsCard } from "../../../components/MetricsCard";
import type { UserType } from "../../product/Products";
import { toast } from "sonner";
import { Button } from "../../../components/ui/button";
import EventDeleteDialog from "./EventDeleteDialog";
import { MapPin } from "lucide-react";

interface EventType {
  createdBy: UserType;
  email: string;
  name: string;
  user_id: string;
  created_at: string;
  event_date: string;
  event_description: string;
  event_id: string;
  event_name: string;
  event_status: EventStatustype;
  event_venue: string;
}
type EventStatustype = "scheduled" | "completed";

const AdminEvents = () => {
  const [events, setEvents] = useState<EventType[] | []>([]);
  const [completed, setcompleted] = useState<number>(0);

  const [EventDialogOpen, setEventDialogOpen] = useState(false);
  const [selectEventId, setSelectEventId] = useState("");

  const fetching = async () => {
    const data = await fetchAllEventsAPI();
    setEvents(data.events);

    const events: EventType[] = data.events;
    const completed = events.filter(
      (evn: EventType) => evn.event_status === "completed"
    ).length;
    setcompleted(completed);
  };

  const handleDelete = async () => {
    try {
      alert(selectEventId);
      const response = await deleteEventAPI(selectEventId);
      console.log(response);
      if (response.success) {
        toast.success("Event Deleted succesfully");
      }
      fetching();
    } catch (error) {
      console.log(error);
      toast.error("Error in deleting event");
    }
  };

  const handleDeleteClick = (event_id: string) => {
    setEventDialogOpen(true);
    setSelectEventId(event_id);
  };
  useEffect(() => {
    fetching();
  }, []);
  return (
    <>
      <div className="">
        <h1 className="text-3xl text-gray-700 font-semibold p-2">Events</h1>
        <div className="flex items-center bg-gray-100 dark:bg-gray-900  mb-2">
          <div className="container max-w-full mx-auto py-3 ">
            <div className="grid gap-7 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
              <MetricsCard heading="Total Events" value={events?.length} />
              <MetricsCard heading="Completed" value={completed} />
              <MetricsCard
                heading="Scheduled"
                value={events?.length - completed}
              />
            </div>
          </div>
        </div>
        <div className="bg-white p-4 mt-4 rounded-lg flex justify-center items-center shadow-lg">
          <table className="w-full text-left text-gray-500 dark:text-gray-400 ">
            <thead className="hidden lg:table-header-group text-lg capitalize text-gray-600 ">
              <tr>
                <th className="px-6 py-3">Event name</th>
                <th className="px-6 py-3">Event Date</th>
                <th className="px-6 py-3">Event Venue</th>
                <th className="px-6 py-3">Organizer</th>
                <th className="px-6 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events?.map((evnt: EventType) => (
                <tr key={evnt.event_id} className="block lg:table-row capitalize border-b">
                  <td className="lg:hidden p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-start ">
                      <div className="mt-1 flex items-center gap-3 ">
                        <div className="flex flex-col gap-1">
                          <p className="font-sans text-lg antialiased font-medium text-blue-gray-900">
                            {evnt?.event_name}
                          </p>
                          <p className="font-sans text-md antialiased font-normal text-blue-gray-700">
                            {evnt?.event_description}
                          </p>
                          <div className=" flex gap-2 mt-2">
                            <p className="font-sans text-sm antialiased font-normal text-blue-gray-700 opacity-70">
                              Event Date
                            </p>
                            <p className="font-sans text-sm antialiased font-normal text-blue-gray-900">
                              {new Date(evnt.event_date).toLocaleString()}
                            </p>
                          </div>
                           <div>
                            <p className="flex gap-1 mt-1">
                              <MapPin width={20}/> {evnt.event_venue}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 mt-2">
                        <div className="text-center">
                          {evnt.event_status === "scheduled" ? (
                            <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 ring-1 ring-inset ring-yellow-400/20">
                              {evnt.event_status}
                            </span>
                          ) : evnt.event_status === "completed" ? (
                            <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 ring-1 ring-inset ring-green-500/20">
                              {evnt.event_status}
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-md bg-red-400/10 px-2 py-1 text-xs font-medium text-red-400 ring-1 ring-inset ring-red-400/20">
                              {evnt.event_status}
                            </span>
                          )}
                        </div>
                        <div>
                          <Button
                            onClick={() => handleDeleteClick(evnt.event_id)}
                            className="text-red-800 hover:text-red-900 bg-red-200 hover:bg-red-300"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* table */}
                  <td className="hidden lg:table-cell px-6 py-3">
                    <div>
                      <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                        {evnt.event_name}
                      </p>
                    </div>
                  </td>

                  <td className="hidden lg:table-cell  px-6 py-3">
                    <div>
                      <p>{new Date(evnt.event_date).toLocaleString()}</p>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-3">
                    <div>
                      <p>{evnt.event_venue}</p>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-3">
                    <div>
                      <p>{evnt.createdBy.name}</p>
                    </div>
                  </td>
                  <td className="hidden lg:table-cell px-6 py-3">
                    <div>
                      <span>
                        <Button
                          onClick={() => handleDeleteClick(evnt.event_id)}
                          className="text-red-800 hover:text-red-900 bg-red-200 hover:bg-red-300"
                        >
                          Delete
                        </Button>
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        .
        <EventDeleteDialog
          setEventDialogOpen={setEventDialogOpen}
          EventDialogOpen={EventDialogOpen}
          handleDelete={handleDelete}
        />
      </div>
    </>
  );
};

export default AdminEvents;
