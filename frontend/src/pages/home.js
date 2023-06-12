import React from "react";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-full bg-bg1 flex justify-center items-center flex-col">
            <div className="text-6xl">
                Chat
            </div>
            <div className="text-2xl m-5">
                Bir gruba katıl ya da yeni bir grup oluşturarak mesajlaşmaya başla.
            </div>
            <div className="flex flex-row items-center">
            <div className="text-blue-500 
                                px-3 
                                py-1 
                                rounded-md 
                                cursor-pointer
                                hover:bg-blue-500
                                hover:text-white
                                transition 
                                ease-in-out 
                                delay-50"
                    onClick={() => { navigate('/login') }}>
                    Giriş yap
                </div>
                <span className="px-1">
                    ya da
                </span>
                <div className="text-blue-500 
                                px-3 
                                py-1 
                                rounded-md 
                                cursor-pointer
                                hover:bg-blue-500
                                hover:text-white
                                transition 
                                ease-in-out 
                                delay-50"
                    onClick={() => { navigate('/signup') }}>
                    Kayıt ol
                </div>
            </div>
        </div>
    )
}

export default Home;