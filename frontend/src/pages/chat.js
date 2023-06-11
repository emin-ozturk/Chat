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
        <div className='w-full h-full flex flex-row bg-bg1 '>
            <div className='w-2/6 h-full flex justify-center p-4 items-center'>
                <div className='w-full h-full flex flex-col shadow-2xl rounded-3xl bg-white'>
                    <div className='w-full h-12 flex items-center p-8 font-bold text-2xl font-sans'>
                        Chat
                    </div>
                    <div className='w-full flex-1 p-6 overflow-auto'>
                        {chats.map((chat, index) => (
                            <ChatArea chat={chat} onChatClick={handleChatClick} />
                        ))}
                    </div>
                </div>
            </div>


            <div className='w-2/6 flex flex-1 flex-col'>
                <div className='w-full h-12 flex items-center p-6'>
                    kanalAdı1
                </div>
                <div className='w-full flex-1 flex-col flex justify-between overflow-hidden'>
                    <div className='w-full flex-1 py-6 px-24 flex flex-col overflow-auto'>
                        {channelMessages.map((message, index) => {
                            if (message.sender.id === currentUserID) {
                                return <SelfMessage message={message} />
                            } else {
                                return <Message message={message} />
                            }
                        })}
                    </div>
                    <div className='w-full h-14 flex items-center pb-12'>
                        <div className='w-full m-24 shadow-md rounded-xl '>
                            <div class="relative">
                                <input className="block 
                                                w-full 
                                                p-4 
                                                pl-6
                                                text-sm 
                                                bg-white
                                                rounded-xl
                                                outline-none"
                                    placeholder="Mesaj yaz" />
                                <button type="submit"
                                    className="text-white 
                                                absolute 
                                                right-2.5 
                                                bottom-2.5 
                                                bg-blue-700 
                                                hover:bg-blue-800 
                                                font-medium 
                                                rounded-lg 
                                                text-sm 
                                                px-4 
                                                py-2">
                                    Gönder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat