import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../api/request';

const Signup = () => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await signup({ 
            name,
            surname,
            email,
            password,
            username,
        });
        if (res.status === 200) {
            navigate('/');
        } else if (res.status === 401) {
            setError({ error: res.data.message });
        }
    }

    return (
        <div className="w-full h-full bg-bg1 flex flex-col items-center">
            <div className='w-2/5 flex flex-col items-center'>
                <span className="text-slate-600 text-4xl font-bold mt-14 mb-10">
                    Kayıt ol
                </span>
                <input
                    className="w-2/3 h-11 shadow-md mb-8 rounded-lg p-3 outline-none"
                    placeholder="Ad"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    className="w-2/3 h-11 shadow-md mb-8 rounded-lg p-3 outline-none"
                    placeholder="Soyad"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                <input
                    className="w-2/3 h-11 shadow-md mb-8 rounded-lg p-3 outline-none"
                    placeholder="E posta"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
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
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    className="w-1/3 h-11 bg-slate-600 rounded-lg text-white hover:bg-slate-900"
                    onClick={handleSignup}
                >
                    Kaydol
                </button>

                <span className="text-red-700 text-lg mt-3">
                    {error}
                </span>
            </div>
        </div>
    )
}

export default Signup