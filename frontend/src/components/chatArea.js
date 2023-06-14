import React from "react";
import { formatDate } from '../utils'

const ChatArea = (props) => {
    const { chat, onChatClick } = props;

    const handleChatClick = () => {
        onChatClick(chat._id);
    };

    return (
        <div>
            <div
                className='w-full h-20 flex flex-row border-b-2 p-2 hover:bg-gray-50 hover:cursor-pointer'
                onClick={handleChatClick}>
                <div className='w-16 h-full shadow-lg rounded-full mr-4'>
                    <div className='w-full h-full bg-user bg-top bg-cover rounded-full'></div>
                </div>
                <div className='w-full flex flex-1 flex-col justify-center'>
                    <div className='flex justify-between'>
                        <div className="font-bold">
                            {chat.name}
                        </div>
                        <div>
                            {formatDate(chat.lastMessage.createdAt)}
                        </div>
                    </div>
                    <div className="flex flex-row">
                        <div className="mr-1 text-black">
                            {
                                chat.lastMessage.senderID.name + ' ' +
                                chat.lastMessage.senderID.surname + ': '
                            }
                        </div>
                        <div className="text-gray-600">
                            { chat.lastMessage.content }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatArea;