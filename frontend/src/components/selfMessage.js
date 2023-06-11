import React from "react";
import { formatDate } from '../utils'

const SelfMessage = (props) => {
    return (
        <div className="w-full flex justify-end">
            <div
                className='bg-blue-400 
                            w-auto 
                            inline-block 
                            py-2 
                            px-3 
                            rounded-xl 
                            rounded-br-none 
                            mb-2 
                            text-sm 
                            text-white
                            shadow-lg'>
                <div>
                    <div>
                        {props.message.content}
                    </div>
                    <div className="text-gray-200 text-s">
                        {formatDate(props.message.createdAt)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SelfMessage