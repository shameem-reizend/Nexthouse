import React, { useState } from 'react';
import { EyeOff, Eye } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
 import { toast } from 'react-toastify';

export const Login: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

    const login = async (email: string, password: string) => {
        const response = await axios.post('http://localhost:5000/auth/login', {email, password});
        return response.data;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const userData = await login(email, password);
            if(userData){
                localStorage.setItem("userData", JSON.stringify(userData.data.user));
                localStorage.setItem("accessToken", userData.data.token);
            }
            toast.success('login successful');
            navigate('/')
        } catch (err) {
            console.log(err);
            toast.error('login failed');
        }
    }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
        <div className="w-6xl flex">
            <div className="bg-red-500 w-4xl p-4 flex justify-center items-center rounded-tl-2xl rounded-bl-2xl">
                <div className="">
                    <h1 className="text-white font-bold text-5xl">
                        NextHouse
                    </h1>
                </div>
            </div>
            <div className="bg-white w-4xl p-5 rounded-tr-2xl rounded-br-2xl">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                        Sign In to <span className="bg-linear-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">NextHouse</span>
                    </h2>
                    <p className="text-gray-600">Enter your credentials to access your account</p>
                </div>

                <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className="group">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-3">
                        Email Address
                        </label>
                        <div className="relative">
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 `}
                            placeholder="you@example.com"
                        />
                        </div>
                    </div>

                    <div className="group">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-3">
                        Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type= {showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className={`w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300 `}
                                placeholder="Enter your password"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full group relative bg-linear-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100 border border-red-500/20 overflow-hidden"
                    >
                        SignIn
                    </button>
                </form>
            </div>
        </div>
    </div>
  )
}
