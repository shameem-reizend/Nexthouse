// import { ChatBubbleLeftIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import {  SearchIcon } from "lucide-react";

// import { Button } from "../../components/ui/button";


export interface userProp{

  email: string,
  name: string,
  phone_number:string,
  profile_pic: string,
  
  role:string,
  user_id: string
}

export interface allUserProps extends userProp{
  invites:object[]
}

const SidebarMessage = ({users,setSelectedUser,mobileView}:{users:allUserProps[],setSelectedUser: React.Dispatch<React.SetStateAction<allUserProps | undefined>>,mobileView:boolean}) => {
  const [user] = useState<userProp | null>(JSON.parse(localStorage.getItem("userData")!));
  const[activeTab,setActiveTab]=useState("All")

  const [search,setSearch]=useState("")

  const [filteredUsers,setFilteredUser]=useState<allUserProps[]>([])

  const handleUserSelect = (user: allUserProps) => {
    setSelectedUser(user);
  };

  useEffect(()=>{
    const temp_users=search===""?users:users.filter((user)=>user.name.toLowerCase().includes(search.toLowerCase()))
    setFilteredUser(temp_users)
  },[search, users])

  return (
    <div className={`${mobileView?"w-full":"w-1/4"} bg-white border-2 p-4 lg:p-8 no-scrollbar overflow-y-auto`}>
      <div className="flex space-x-3 lg:space-x-5">
        <img className="w-8 h-8 lg:w-10 lg:h-10 rounded-full"
          src={
            user?.profile_pic
              ? user.profile_pic
              : "https://randomuser.me/api/portraits/men/32.jpg"
          }
          alt="Profile pic"
        />
        <div className="relative w-full flex items-center">
          <SearchIcon className="absolute right-2 aspect-square max-w-4 lg:max-w-5 text-slate-400"/>
          <Input placeholder="Enter name to search" className="pl-3 tracking-wider text-sm lg:text-base" value={search} onChange={(e)=>setSearch(e.target.value)}/>
        </div>
      </div>

      <div className="my-4 lg:my-6">
        <nav className="flex">
           <button onClick={()=>setActiveTab("All")} className={`flex-1 py-2 text-sm lg:text-base  ${activeTab==="All"?"border-b-2 border-zinc-900 ":"hover:opacity-70 transition-all duration-200 "}`} >All</button>
           <button onClick={()=>setActiveTab("People")} className={`flex-1 py-2 text-sm lg:text-base ${activeTab==="People"?"border-b-2 border-zinc-900":"hover:opacity-70 transition-all duration-200"}`}>People</button>
           <button onClick={()=>setActiveTab("Group")} className={`flex-1 py-2 text-sm lg:text-base  ${activeTab==="Group"?"border-b-2 border-zinc-900":"hover:opacity-70 transition-all duration-200"}`}>Group</button>
        </nav>
      </div>
      <div className="">
        {filteredUsers.length==0? <div className="text-center text-gray-500 py-8">No user found</div>:
          <div>
            {filteredUsers.map((user:allUserProps)=>{
              return (
                <div key={user.user_id} className="border-b-2 border-zinc-300 flex  my-2 lg:my-3  p-3 lg:py-2  lg:px-5  items-center -m-3 cursor-pointer hover:bg-gray-50 transition-colors" onClick={()=>handleUserSelect(user)}>
                  <img src={user.profile_pic ||  "https://randomuser.me/api/portraits/men/32.jpg"} className="w-8 h-8 lg:w-10 lg:h-10 rounded-full" alt={user.name} />
                  <div className="pl-4 lg:pl-6 flex-1 min-w-0">
                  <h3 className="capitalize text-sm lg:text-base truncate ">{user.name}</h3>
                  <p className=" text-slate-300 text-xs lg:text-sm truncate">{user.email}</p>
                  </div>
                  <div className=" bg-emerald-200 w-6 h-6 lg:w-7 lg:h-7 rounded-full text-center text-xs lg:text-sm  flex justify-center items-center">
                    <span>2</span>
                  </div>
                </div>
              )
            })}
          </div>
        
        }
      </div>
    </div>
  );
};

export default SidebarMessage;
