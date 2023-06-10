import ChatArea from '../components/chatArea';
import Message from '../components/message';
import SelfMessage from '../components/selfMessage';
import React, { useState, useEffect } from 'react';
import { getChannel, getChannelMessages, getCurrentUserID } from '../api/request';

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [channelMessages, setChannelMessages] = useState([]);
    const [currentUserID, setCurrentUserID] = useState([]);

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

        const fetchCurrentUserID = async () => {
            try {
                const res = await getCurrentUserID();
                const data = res.data;
                setCurrentUserID(data.currentUserID)
            } catch (error) {
                console.log(error);
            }
        };

        fetchChannel();
        fetchCurrentUserID();

    }, []);

    const fetchChannelMessages = async (channelID) => {
        try {
            const res = await getChannelMessages(channelID);
            const messages = res.data.messages;
            setChannelMessages(messages);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChatClick = (channelID) => {
        fetchChannelMessages(channelID)
    };

    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-2/6 h-full flex flex-col shadow-xl'>
                <div className='w-full h-12 bg-white shadow-md flex items-center p-6 font-bold text-2xl font-sans'>
                    Chat
                </div>
                <div className='w-full flex-1 p-6 overflow-auto'>
                    {chats.map((chat, index) => (
                        <ChatArea chat={chat} onChatClick={handleChatClick} />
                    ))}
                </div>
            </div>

            <div className='w-2/6 flex flex-1 flex-col'>
                <div className='w-full h-12 shadow-md'>

                </div>
                <div className='w-full flex-1 flex-col flex justify-between overflow-hidden'>
                    <div className='w-full flex-1 bg-slate-200 py-6 px-16 flex flex-col overflow-auto'>
                        {channelMessages.map((message, index) => {
                            if (message.sender.id === currentUserID) {
                                return <SelfMessage message={message} />
                            } else {
                                return <Message message={message} />
                            }
                        })}
                    </div>
                    <div className='w-full h-14 flex items-center bg-slate-200 pb-5'>
                        <form className='w-full m-16 '>
                            <div class="relative">
                                <input className="block 
                                                w-full 
                                                p-4 
                                                pl-6
                                                text-sm 
                                                text-gray-900 
                                                rounded-lg 
                                                dark:bg-gray-700
                                                dark:text-white" placeholder="Search" required />
                                <button type="submit" className="text-white 
                                                                    absolute 
                                                                    right-2.5 
                                                                    bottom-2.5 
                                                                    bg-blue-700 
                                                                    hover:bg-blue-800 
                                                                    font-medium 
                                                                    rounded-lg 
                                                                    text-sm 
                                                                    px-4 
                                                                    py-2">Gönder</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat