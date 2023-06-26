import React, { useEffect, useState } from "react";
import { getCheckUser, createChannel } from '../api/request';

const CreateChannel = (props) => {
    const { currentUser, onCloseDialogClick } = props

    const [newGroupUsers, setNewGroupUsers] = useState([]);
    const [userName, setUserName] = useState('');
    const [channelName, setChannelName] = useState('');
    const [channelDesc, setChannelDesc] = useState('');

    const maxGroupUserCount = 5;

    useEffect(() => {
        const user = {
            name: currentUser.name,
            surname: currentUser.surname,
            _id: currentUser._id
        };
        setNewGroupUsers(newGroupUsers => [...newGroupUsers, user]);
    }, [currentUser._id, currentUser.name, currentUser.surname]);

    const handleAddNewGroupUser = async () => {
        if (newGroupUsers.length === maxGroupUserCount || userName === '') {
            return;
        }

        const res = await getCheckUser(userName);
        const user = res.data
        if (user) {
            const newUser = {
                name: user.name,
                surname: user.surname,
                _id: user._id
            }
            setNewGroupUsers(newGroupUsers => [...newGroupUsers, newUser]);
        }
    }

    const handleRemoveGroupUser = (userID) => {
        setNewGroupUsers(newGroupUsers.filter(user => user._id !== userID));
    }

    const handleCreateChannel = async () => {
        if (channelName === '' || channelDesc === '') {
            return
        }
        const userIDs = newGroupUsers.map(obje => obje._id);
        await createChannel(channelName, channelDesc, userIDs);
        onCloseDialogClick();
    }

    return (
        <div className='w-full h-full bg-slate-400 bg-opacity-25 absolute'>
            <div className='w-2/5 
                                    h-4/5 
                                    bg-white 
                                    absolute 
                                    m-auto 
                                    left-0 
                                    right-0 
                                    top-0 
                                    bottom-0 
                                    flex 
                                    flex-col
                                    p-6
                                    rounded-md'>

                <div className='flex justify-center font-bold text-xl mb-5'>
                    Sohbet oluştur
                </div>

                <div className='flex flex-1 flex-col overflow-y-auto'>
                    <div className='flex flex-col mb-5'>
                        <span className='font-bold'>Kanal adı</span>
                        <div className='flex flex-row mt-1'>
                            <input
                                className='w-full h-10 bg-slate-50 rounded-md p-3 outline-none'
                                placeholder='Kullanıcı adı girin'
                                value={channelName}
                                onChange={(e) => { setChannelName(e.target.value) }} />
                        </div>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <span className='font-bold'>Kanal açıklaması</span>
                        <div className='flex flex-row mt-1'>
                            <input
                                className='w-full h-10 bg-slate-50 rounded-md p-3 outline-none'
                                placeholder='Kullanıcı adı girin'
                                value={channelDesc}
                                onChange={(e) => { setChannelDesc(e.target.value) }} />
                        </div>
                    </div>
                    <div className='flex flex-col mb-5'>
                        <span className='font-bold'>Kullanıcı ekle</span>
                        <div className='flex flex-row mt-1'>
                            <input
                                className='w-full h-10 bg-slate-50 rounded-md p-3 outline-none'
                                placeholder='Kullanıcı adı girin'
                                value={userName}
                                onChange={(e) => { setUserName(e.target.value) }} />
                            <button
                                className='w-auto h-10 bg-green-500 ml-4 rounded-md px-4 text-white'
                                onClick={() => { handleAddNewGroupUser() }}>Ekle</button>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-bold'>Eklenen kullanıcılar</span>
                        <div className='flex flex-col mt-4'>
                            {newGroupUsers.map((user, index) => (
                                <div className='flex justify-between mb-1'>
                                    <span>{user.name + ' ' + user.surname}</span>
                                    {(user._id !== currentUser._id ?
                                        <span
                                            className='cursor-pointer font-bold'
                                            onClick={() => { handleRemoveGroupUser(user._id) }}>
                                            X
                                        </span>
                                        : ''
                                    )}

                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <button
                    className='bg-blue-600 py-2 text-white rounded-lg'
                    onClick={handleCreateChannel}>
                    Oluştur
                </button>
            </div>
        </div>
    )
};

export default CreateChannel;