import React from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();

  return (
    <div className='flex-1 h-full bg-hero flex flex-col items-center'>
      <span className="text-white text-4xl font-bold mt-32 mb-10">
        Hesabın yok mu?
      </span>
      <span className="text-white text-lg">
        Mesajlaşmaya başlamak için şimdi hesap oluştur.
      </span>
      <button
        className="w-1/3 h-11 bg-white rounded-lg text-slate-600 hover:bg-slate-200 mt-10"
        onClick={() => { navigate('/signup'); }}
      >
        Kaydol
      </button>

    </div>
  )
}

export default Signup