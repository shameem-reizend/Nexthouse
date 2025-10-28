import { useState } from "react"
import { Button } from "../../components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select"
import { fetchAllUsersAPI } from "../../api/modules/user.api";
import { createInviteAPI } from "../../api/modules/invite.api";
import { toast } from "react-toastify";

interface User {
  user_id: string,
  name: string,
  phone_number: string,
  email: string
}

interface InviteUserPropType {
  event_id: string
}

export const InviteUser: React.FC<InviteUserPropType> = ({event_id}) => {

  const [isOpen, setIsOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  const handleClick = async () => {
    try {
      setIsOpen(true);
      const usersData = await fetchAllUsersAPI();
      setUsers(usersData.users);
      const currentUserData = JSON.parse(localStorage.getItem("userData")!);
      setCurrentUser(currentUserData);
    } catch (error) {
      toast.error('Failed to load Users')
      console.log(error);
    }
  }

  const handleSelectChange = (value: string) => {
    setSelectedUser(value);
  }

  const handleInviteUser = async () => {
    try {
      if (!selectedUser) {
        toast.warn("Please select a user first.");
        return;
      }
      const inviteData = await createInviteAPI({event_id, reciever_id: selectedUser});
      if(inviteData.success === true){
        setSelectedUser("");
        setIsOpen(false);
        toast.success("Invite sent");
      }
    } catch (error) {
      toast.error('Failed to sent');
      console.log(error);
    }
  }
  const filteredUsers = users.filter((user: User) => user.user_id !== currentUser?.user_id);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <button onClick={handleClick} className="bg-zinc-900 hover:bg-zinc-700 active:bg-zinc-500 text-white font-bold py-2 px-4 rounded-full flex items-center gap-2 cursor-pointer">
            Invite
        </button>
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
                  {
                    filteredUsers.map((user: User) => (
                      <SelectItem key={user.user_id} value={user.user_id}>
                        <span className="capitalize">{user.name}</span>
                        - {user.email}
                      </SelectItem>
                    ))
                  }
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <button onClick={handleInviteUser} className="bg-zinc-900 text-white py-2 px-4 rounded-lg font-bold hover:bg-zinc-700 active:bg-zinc-500 cursor-pointer">Invite</button>
          </div>
        </div>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button onClick={() => setIsOpen(false)} className="cursor-pointer" type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
