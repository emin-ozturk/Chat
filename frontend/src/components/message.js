import React from "react";

const Message = (props) => {
    return (
        <div>
            <div
                className='bg-blue-400 
                            w-auto 
                            inline-block 
                            p-3 
                            rounded-xl 
                            rounded-bl-none 
                            mb-2 
                            text-sm 
                            text-white'>
                <div className='font-bold text-sky-800'>
                    {props.message.sender.name + ' ' + props.message.sender.surname}
                </div>
                <div>
                    {props.message.content}
                </div>
            </div>
        </div>
    )
}

export default Message