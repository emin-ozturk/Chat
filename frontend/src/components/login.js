import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";
import { login } from '../api/utils';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await login(username, password)
            console.log(res)
            if (res.response.data.status) {

                navigate('/chat');
            } else {
                setError('Kullanıcı adı veya şifre hatalı');
            }
        } catch (error) {
            setError('Server bağlanırken hata oluştu')
            console.error('API bağlantı hatası:', error);
        }
    };

    return (
        <div className="w-2/5 h-full bg-slate-50 flex flex-col items-center">
            <span className="text-slate-600 text-4xl font-bold mt-32 mb-10">
                Giriş yap
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
                onClick={handleLogin}
            >
                Giriş
            </button>

            <span className="text-red-700 text-lg mt-3">
                {error}
            </span>
        </div>
    )
}

export default Login