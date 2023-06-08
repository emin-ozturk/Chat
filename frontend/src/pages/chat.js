import React from 'react';
import ChatArea from '../components/chatArea';

const Chat = () => {

    const chats = [
        { id: 11, name: 'Emin Öztürk', date: '12.14', message: 'Merhaba nasılsın, iyi misin?'},
        { id: 12, name: 'Ali Yılmaz', date: '10.09', message: 'Deneme mesajı'},
        { id: 13, name: 'Emin Öztürk', date: '12.14', message: 'Merhaba nasılsın, iyi misin?'},
        { id: 14, name: 'Ali Yılmaz', date: '10.09', message: 'Deneme mesajı'},
        { id: 15, name: 'Emin Öztürk', date: '12.14', message: 'Merhaba nasılsın, iyi misin?'},
        { id: 16, name: 'Ali Yılmaz', date: '10.09', message: 'Deneme mesajı'},
        { id: 17, name: 'Emin Öztürk', date: '12.14', message: 'Merhaba nasılsın, iyi misin?'},
        { id: 18, name: 'Ali Yılmaz', date: '10.09', message: 'Deneme mesajı'}
    ]
    
    return (
        <div className='w-full h-full flex flex-row'>
            <div className='w-2/6 h-full flex flex-col shadow-xl'>
                <div className='w-full h-12 bg-white shadow-md flex items-center p-6 font-bold text-2xl font-sans'>
                    Chat
                </div>
                <div className='w-full flex-1 p-6 overflow-auto'>
                    <ChatArea chats = { chats } />
                </div>
            </div>

            <div className='w-2/6 flex flex-1 flex-col'>
                <div className='w-full h-12 shadow-md'>
                
                </div>
                <div className='w-full flex-1'>

                </div>
            </div>
        </div>
    )
}

export default Chat