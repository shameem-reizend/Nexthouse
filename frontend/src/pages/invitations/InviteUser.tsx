import { useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { fetchAllUsersAPI } from "../../api/modules/user.api";
import { createInviteAPI } from "../../api/modules/invite.api";
import { toast } from "react-toastify";
import type { Event } from "../event/EventList";

interface User {
  user_id: string;
  name: string;
  phone_number: string;
  email: string;
  invites: InviteType[];
}
interface InviteType {
  invite_id: string;
  event: Event;
}

interface InviteUserPropType {
  event_id: string;
}

export const InviteUser: React.FC<InviteUserPropType> = ({ event_id }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [currentUser, setCurrentUser] = useState<User>();

  const handleClick = async () => {
    try {
      setIsOpen(true);
      const usersData = await fetchAllUsersAPI();
      setUsers(usersData.users);
      const currentUserData = JSON.parse(localStorage.getItem("userData")!);
      setCurrentUser(currentUserData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectChange = (value: string) => {
    setSelectedUser(value);
  };

  const handleInviteUser = async () => {
    try {
      const inviteData = await createInviteAPI({
        event_id,
        reciever_id: selectedUser,
      });
      if (inviteData.success == true) {
        setSelectedUser("");
        setIsOpen(false);
        toast.success("Invite sent");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to Invite");
      console.log(error);
    }
  };
  const filteredUsers = users.filter(
    (user: User) => user.user_id != currentUser?.user_id
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      <DialogTrigger asChild>
        <button
          onClick={handleClick}
          className="bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-500 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer"
        >
          Invite
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
          <DialogDescription>
            Choose the user you need to invite
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <div className="grid flex-1 gap-2">
            <Select onValueChange={handleSelectChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a user" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Users</SelectLabel>
                  {filteredUsers.map((user: User) => {
                    const alreadyInvited = user.invites?.some(
                      (invite) => invite.event.event_id === event_id
                    );
                    return (
                      <SelectItem
                        disabled={alreadyInvited}
                        key={user.user_id}
                        value={user.user_id}
                      >
                        <div className="flex justify-between w-full">
                          <span className="capitalize">
                            {user.name} - {user.email}
                          </span>
                          {alreadyInvited && (
                            <span className="text-gray-600 text-xs ml-2">
                              (Invite already sent)
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <button
              onClick={handleInviteUser}
              className="bg-zinc-900 text-white py-2 px-4 rounded-lg font-bold hover:bg-zinc-700 active:bg-zinc-500 cursor-pointer"
            >
              Invite
            </button>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button
              onClick={() => setIsOpen(false)}
              className="cursor-pointer"
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
