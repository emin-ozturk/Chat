import ChatArea from '../components/chatArea';
import Message from '../components/message';
import SelfMessage from '../components/selfMessage';
import React, { useState, useEffect } from 'react';
import { getChannel } from '../api/request';

const Chat = () => {
    const [chats, setChats] = useState([]);
    useEffect(() => {

        const fetchChannel = async () => {
            try {
                const res = await getChannel();
                const data = res.data;
                setChats(data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchChannel();

    }, []);

    // const chats = [
    //     { id: 11, name: 'Emin Öztürk', date: '12.14', message: 'Merhaba nasılsın, iyi misin?' },
    //     { id: 12, name: 'Ali Yılmaz', date: '10.09', message: 'Deneme mesajı' },
    //     { id: 13, name: 'Emin Öztürk', date: '12.14', message: 'Merhaba nasılsın, iyi misin?' },
    //     { id: 14, name: 'Ali Yılmaz', date: '10.09', message: 'Deneme mesajı' },
    //     { id: 15, name: 'Emin Öztürk', date: '12.14', message: 'Merhaba nasılsın, iyi misin?' },
    //     { id: 16, name: 'Ali Yılmaz', date: '10.09', message: 'Deneme mesajı' },
    //     { id: 17, name: 'Emin Öztürk', date: '12.14', message: 'Merhaba nasılsın, iyi misin?' },
    //     { id: 18, name: 'Ali Yılmaz', date: '10.09', message: 'Deneme mesajı' }
    // ]

    const messages = [
        { senderID: 1, sender: "Emin Öztürk", context: '1-Merhaba nasılsın, iyi misin?' },
        { senderID: 2, sender: "Ali Yılmaz", context: '2-Merhaba iyiyim' },
        { senderID: 1, sender: "Emin Öztürk", context: '1-Merhaba nasılsın, iyi misin?' },
        { senderID: 1, sender: "Emin Öztürk", context: '3-Merhaba' },
        { senderID: 2, sender: "Ali Yılmaz", context: '4-deneme' },
        { senderID: 2, sender: "Ali Yılmaz", context: '2-Merhaba iyiyim' },
        { senderID: 2, sender: "Ali Yılmaz", context: '2-Merhaba iyiyim' },
        { senderID: 1, sender: "Emin Öztürk", context: '5-Merhaba nasılsın, iyi misin?' },
        { senderID: 1, sender: "Emin Öztürk", context: '3-Merhaba' },
        { senderID: 2, sender: "Ali Yılmaz", context: '4-deneme' },
        { senderID: 1, sender: "Emin Öztürk", context: '5-Merhaba nasılsın, iyi misin?' },
        { senderID: 1, sender: "Emin Öztürk", context: '1-Merhaba nasılsın, iyi misin?' },
    ]

    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-2/6 h-full flex flex-col shadow-xl'>
                <div className='w-full h-12 bg-white shadow-md flex items-center p-6 font-bold text-2xl font-sans'>
                    Chat
                </div>
                <div className='w-full flex-1 p-6 overflow-auto'>
                    {chats.map((chat, index) => (
                        <ChatArea chat={chat} />
                    ))}
                </div>
            </div>

            <div className='w-2/6 flex flex-1 flex-col'>
                <div className='w-full h-12 shadow-md'>
                </div>
                <div className='w-full flex-1 flex-col flex justify-between overflow-hidden'>
                    <div className='w-full flex-1 bg-slate-200 py-6 px-16 flex flex-col overflow-auto'>
                        {messages.map((message, index) => {
                            if (message.senderID === 1) {
                                return <SelfMessage message={message} />
                            } else {
                                return <Message message={message} />
                            }
                        })}
                    </div>
                    <div className='w-full h-12 flex items-center p-6'>

                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat