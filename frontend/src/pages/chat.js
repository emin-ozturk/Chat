import ChatArea from '../components/chatArea';
import Message from '../components/message';
import SelfMessage from '../components/selfMessage';
import React, { useRef, useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';
import { getChannel, getChannelMessages, getCurrentUserID } from '../api/request';
import { getToken } from '../token';

const socket = socketIOClient('http://localhost:4000');

const Chat = () => {
    const [chats, setChats] = useState([]);
    const [channel, setChannel] = useState([]);
    const [channelMessages, setChannelMessages] = useState([]);
    const [currentUserID, setCurrentUserID] = useState([]);
    const [message, setMessage] = useState([]);
    const chatAreaRef = useRef(null);

    useEffect(() => {
        return () => {
            socket.disconnect();
        };
    }, []);

    const handleSendMessage = () => {
        socket.emit('newMessage', { 
            channelID: channel._id, 
            content: message,
            token: getToken()
        }, (ackData) => {
            setChannelMessages(channelMessages => [...channelMessages, ackData.messages]);
        });
        setMessage('');
    };

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

    useEffect(() => {
        scrollToBottom();
    }, [channelMessages]);


    const fetchChannelMessages = async (channelID) => {
        try {
            const res = await getChannelMessages(channelID);
            const data = res.data;
            setChannel(data.channel);
            setChannelMessages(data.messages);
        } catch (error) {
            console.log(error);
        }
    };

    const scrollToBottom = () => {
        if (chatAreaRef.current) {
            chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
        }
    }

    return (
        <div className='w-full h-full flex flex-row bg-bg1 '>
            <div className='w-2/6 h-full flex justify-center items-center p-4'>
                <div className='w-full h-full flex flex-col shadow-2xl rounded-3xl bg-white'>
                    <div className='w-full h-12 flex items-center p-8 font-bold text-2xl font-sans'>
                        Chat
                    </div>
                    <div className='w-full flex-1 p-6 overflow-auto'>
                        {chats.map((chat, index) => (
                            <ChatArea chat={chat} onChatClick={fetchChannelMessages} />
                        ))}
                    </div>
                </div>
            </div>

            {channelMessages.length === 0 ? (
                <div className='flex-1 h-full flex justify-center items-center text-lg'>
                    Mesajlaşmaya başlamak için bir sohbet seç veya yeni bir sohbet oluştur.
                </div>
            ) : (
                <div className='w-2/6 flex flex-1 flex-col'>
                    <div className='w-full h-12 flex items-center pt-6 px-24'>
                        {channel.name}
                    </div>
                    <div className='w-full flex-1 flex-col flex justify-between overflow-hidden'>
                        <div className='w-full flex-1 py-6 px-24 flex flex-col overflow-auto' ref={chatAreaRef}>
                            {channelMessages.map((message, index) => {
                                if (message.sender._id === currentUserID) {
                                    return <SelfMessage message={message} />
                                } else {
                                    return <Message message={message} />
                                }
                            })}
                        </div>
                        <div className='w-full h-14 flex items-center pb-12'>
                            <div className='w-full m-24 shadow-md rounded-xl flex flex-row bg-white'>
                                <input className="w-full
                                                p-4 
                                                text-sm 
                                                outline-none
                                                rounded-xl"
                                    placeholder="Mesaj yaz"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)} />
                                <button type="submit"
                                    className="flex-1 text-white 
                                                bg-blue-700 
                                                hover:bg-blue-800 
                                                font-medium 
                                                rounded-lg 
                                                text-sm 
                                                px-4 
                                                py-2
                                                m-2
                                                ml-0"
                                    onClick={handleSendMessage}>
                                    Gönder
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div >
    )
}

export default Chat