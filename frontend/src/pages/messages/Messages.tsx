import React, { useEffect, useState } from 'react';
import { getSocket } from '../../utility/socket';
import { fetchAllUsersAPI } from '../../api/modules/user.api';
import type { UserType } from '../../pages/product/Products';

type messageResponse  = {
    from: string;
    message: string
}

export const SampleSocket: React.FC = () => {
    const [message, setMessage] = useState('');
    const [receivedMessage, setReceivedMessage] = useState<messageResponse []>([]);
    const [sentUser, setSentUser] = useState('f622476e-9484-44f6-8ae1-b441b454f18e');
    const [users, setUsers] = useState<UserType[]>([]);

    const socket = getSocket();
    const currentUser = JSON.parse(localStorage!.getItem('userData')!);

    const sendMessage = () => {
      if(socket){
          socket.emit('message', message, sentUser);
            setMessage('');
      }
    };

    const fetAllUsers = async () => {
        try {
            const userData = await fetchAllUsersAPI();
            const filteredUsers = userData.users.filter((user: UserType) => user.user_id !== currentUser.user_id);
            setUsers(filteredUsers);
        } catch (error) {
            console.log(error)
        }
    }

    const findUser = (user_id: string) => {
       const user = users.filter((user) => user.user_id === user_id);
        return user[0].name;
    }

    useEffect(() => {
        if(!socket) return
        socket.on('message', (data: messageResponse) => {
            console.log(data.message, data.from);   
            setReceivedMessage((prevMsg) => [...prevMsg, data]);
        })

    }, []);

    useEffect(() => {
        fetAllUsers();
    }, [])


    return (
        <div>
            <h1>Real-time Chat</h1>
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
            
        </div>
    );
}