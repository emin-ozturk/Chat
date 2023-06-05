import React, { useState } from 'react';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="w-full h-full bg-background flex flex-col items-center">
            <div className='w-2/5 flex flex-col items-center'>
            <span className="text-white text-4xl font-bold mt-32 mb-10">
                Kayıt ol
            </span>
            <input
                className="w-2/3 h-11 shadow-md mb-8 rounded-lg p-3 outline-none"
                placeholder="Kullanıcı adı"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <input
                className="w-2/3 h-11 shadow-md mb-8 rounded-lg p-3 outline-none"
                placeholder="Şifre"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <button
                className="w-1/3 h-11 bg-slate-600 rounded-lg text-white hover:bg-slate-900"
            >
                Kaydol
            </button>
            </div>
        </div>
    )
}

export default Signup