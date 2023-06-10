import React from "react";

const Chat = (props) => {
    const { chat } = props;

    const formatDate = (dateTimeString) => {
        const date = new Date(dateTimeString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
        const formattedTime = `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
        return `${formattedDate} ${formattedTime}`;
    };
    return (
        <div>
            <div
                className='w-full h-20 flex flex-row border-b-2 p-2 hover:bg-gray-50 hover:cursor-pointer'
                onClick={() => { console.log(chat._id) }}>
                <div className='w-16 h-full shadow-lg rounded-full mr-4'>
                    <div className='w-full h-full bg-user bg-top bg-cover rounded-full'></div>
                </div>
                <div className='w-full flex-1'>
                    <div className='flex justify-between'>
                        <div className="font-bold">
                            {chat.name}
                        </div>
                        <div>
                            {formatDate(chat.createdAt)}
                        </div>
                    </div>
                    <div>
                        {chat.description}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;