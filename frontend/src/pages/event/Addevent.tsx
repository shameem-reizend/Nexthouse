import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Textarea } from "../../components/ui/textarea"

import { ChevronDownIcon } from "lucide-react"
import { Calendar } from "../../components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover"

import { PlusCircle } from "lucide-react"
import React, {useState} from "react"
import { createEventAPI } from "../../api/modules/event.api"
import { toast } from "react-toastify"

export const AddEvent: React.FC = () => {

  const [isOpen, setIsOpen] = useState(false)
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState<Date | undefined>(undefined)


  const handleCreateEvent = async (e:React.FormEvent) => {
    e.preventDefault();

    try {

      const year = date?.getFullYear();
      const month = String(date!.getMonth() + 1).padStart(2, "0");
      const day = String(date?.getDate()).padStart(2, "0");

      const eventData = await createEventAPI({
        event_name: name,
        event_description: description,
        event_venue: venue,
        event_date: `${year}-${month}-${day}`
      })

      if(eventData.success == true){
        setIsOpen(false);
        toast.success('New Event Created')
      }
    } catch (error) {
        console.log(error);
        toast.error('Event Creation Failed')
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <form>
        <DialogTrigger asChild>
            <button onClick={() => setIsOpen(true)} className="bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-500 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer">
                <span><PlusCircle/></span>Add Event
            </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Enter your event details here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="event_name">Event Name</Label>
              <Input id="event_name" name="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="event_description">Event Description</Label>
              <Textarea placeholder="Type your description here." value={description} onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="event_venue">Event Venue</Label>
              <Input id="event_venue" name="venue" value={venue} onChange={(e) => setVenue(e.target.value)}/>
            </div>

            <div className="flex flex-col gap-3">
              <Label htmlFor="date" className="px-1">
                Event Date
              </Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date"
                    className="w-48 justify-between font-normal"
                  >
                    {date ? date.toLocaleDateString() : "Select date"}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    onSelect={(date:Date) => {
                      setDate(date)
                      setOpen(false)
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" className="cursor-pointer" onClick={handleCreateEvent}>Create Event</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
