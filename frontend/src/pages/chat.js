import ChatArea from '../components/chatArea';
import Message from '../components/message';
import SelfMessage from '../components/selfMessage';
import React, { useState, useEffect } from 'react';
import { getChannel, getChannelMessages } from '../api/request';

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [channelMessages, setChannelMessages] = useState([]);
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
                            console.log(message)
                            if (message.senderID === '647a009c65e5a90c8ae269b6') {
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