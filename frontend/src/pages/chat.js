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
                            <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                            <div class="relative">
                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg aria-hidden="true" class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                </div>
                                <input type="search" id="search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" required />
                                    <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat