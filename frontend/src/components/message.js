import React from "react";
import { formatDate } from '../utils'

const Message = (props) => {
    return (
        <div>
            <div
                className='bg-white
                            w-auto 
                            inline-block 
                            py-2 
                            px-4 
                            rounded-xl 
                            rounded-bl-none 
                            mb-2 
                            text-sm 
                            text-black
                            shadow-lg'>
                <div className='font-bold text-blue-400 '>
                    {props.message.sender.name + ' ' + props.message.sender.surname}
                </div>
                <div>
                    <div>
                        {props.message.content}
                    </div>
                    <div className="text-gray-400 text-s">
                        {formatDate(props.message.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Message