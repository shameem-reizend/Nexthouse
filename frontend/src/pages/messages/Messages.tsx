import React, { useCallback, useEffect, useState } from "react";

import { fetchAllUsersAPI } from "../../api/modules/user.api";

import SidebarMessage, { type allUserProps } from "./SidebarMessage";
import ChatSide from "./ChatSide";

export type messageResponse = {
  from: string;
  newMessage: string;
};

export const SampleSocket: React.FC = () => {
  
  const [users, setUsers] = useState<allUserProps[]>([]);
  const [selectedUser, setSelectedUser] = useState<allUserProps | undefined>();
  const [mobileView, setMobileView] = useState<boolean>(false);

  const currentUser = JSON.parse(localStorage!.getItem("userData")!);

  const checkScreenSize = () => {
    setMobileView(window.innerWidth < 1024);
  };

  const fetAllUsers = useCallback(async () => {
    try {
      const userData = await fetchAllUsersAPI();

      const filteredUsers = userData.users.filter(
        (user: allUserProps) => user.user_id !== currentUser.user_id
      );
      setUsers(filteredUsers);
    } catch (error) {
      console.log(error);
    }
  }, [currentUser.user_id]);



  const handleBackToSidebar = () => {
    setSelectedUser(undefined);
  };

  useEffect(() => {
    fetAllUsers();
    checkScreenSize();

    // Add resize listener
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [fetAllUsers]);

  return (
    <div className="h-full -m-8">
      <div className="h-full border-2 border-zinc-200 bg-gray-200 flex lg:flex-row">
        {!mobileView && (
          <>
            <SidebarMessage
              users={users}
              setSelectedUser={setSelectedUser}
              mobileView={mobileView}
            />
            <ChatSide
              selectedUser={selectedUser}
              onBackClick={handleBackToSidebar}
              mobileView={mobileView}
            />
          </>
        )}

        {mobileView && (
          <>
            {!selectedUser && (
              <SidebarMessage
                users={users}
                setSelectedUser={setSelectedUser}
                mobileView={mobileView}
              />
            )}
            {selectedUser && (
              <ChatSide
                selectedUser={selectedUser}
                onBackClick={handleBackToSidebar}
                mobileView={mobileView}
              />
            )}
          </>
        )}
      </div>

      {/* <h1>Real-time Chat</h1>
            <div className="flex gap-10">
                <div className='flex flex-col'>
                    {users.map((user) => (
                        <div onClick={() => setSentUser(user.user_id)} key={user.phone_number}>{user.name}</div>
                    ))}
                </div>
                <div>
                    <input className='border border-zinc-500'
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Type a message..."
                    />
                    <button className='bg-zinc-900 rounded-2xl text-white px-4 py-2 ml-3' onClick={sendMessage}>Send</button>
                    {receivedMessage.map((msg, index) => (
                        <div key={index}>
                            <h1>{findUser(msg.from)}</h1>
                            <h1>{msg.message}</h1>
                        </div>
                    ))}
                </div>
            </div>
             */}
    </div>
  );
};
