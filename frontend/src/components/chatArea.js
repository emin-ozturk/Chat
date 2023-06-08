import React from "react";

const Chat = (props) => {
    return (
        <div>
            {props.chats.map((chat, index) => (
                <div 
                    className='w-full h-20 flex flex-row border-b-2 p-2 hover:bg-gray-50 hover:cursor-pointer'
                    key={index}
                    onClick={() => {console.log(chat.id)}}>
                    <div className='w-16 h-full shadow-lg rounded-full mr-4'>
                        <div className='w-full h-full bg-user bg-top bg-cover rounded-full'></div>
                    </div>
                    <div className='w-full- flex-1'>
                        <div className='flex justify-between'>
                            <div>
                                {chat.name}
                            </div>
                            <div>
                                {chat.date}
                            </div>
                        </div>
                        <div>
                            {chat.message}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Chat;