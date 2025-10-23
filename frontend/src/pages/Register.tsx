import axios from 'axios';
import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Register: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const navigate = useNavigate()

    const register = async (email: string, password: string, name: string, phone_number: string) => {
        const response = await axios.post(`http://localhost:5000/auth/register`, {
            email,
            password,
            name,
            phone_number
        })

        // console.log(response);

        return response.data;
    }

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const registerData = await register(email, password, name, phone);
            if (registerData.success == true) {
                navigate('/login');
                toast.success("Register Successful")
            }
        } catch (err) {
            console.log(err);
            toast.error('Something went wrong')
        }
    }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl flex flex-col md:flex-row">
        <div className="bg-red-500 w-full md:w-1/2 p-4 flex justify-center items-center rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl">
          <div>
            <h1 className="text-white font-bold text-4xl md:text-5xl">
              NextHouse
            </h1>
          </div>
        </div>
        <div className="bg-white w-full md:w-1/2 p-5 rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl">
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Sign Up to{" "}
                <span className="bg-linear-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
                    NextHouse
                </span>
                </h2>
                <p className="text-gray-600">
                Enter your credentials to access your account
                </p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">

                <div className="group">
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-3"
                    >
                        Name
                    </label>
                    <div className="relative">
                        <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                        placeholder=""
                        />
                    </div>
                </div>

                <div className="group">
                <label
                    htmlFor="phone"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                >
                    Phone Number
                </label>
                <div className="relative">
                    <input
                    id="phone"
                    type="tel"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="9999999999"
                    />
                </div>
                </div>

                <div className="group">
                <label
                    htmlFor="email"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                >
                    Email Address
                </label>
                <div className="relative">
                    <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
                    placeholder="you@example.com"
                    />
                </div>
                </div>

                <div className="group">
                <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-gray-700 mb-3"
                >
                    Password
                </label>
                <div className="relative">
                    <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 bg-white/60 backdrop-blur-sm border rounded-xl focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all duration-300"
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
                Register
                </button>
            </form>

          <h1 className="mt-4 w-full text-center">You already have an account ? <a className="text-blue-500 hover:text-blue-400" href="/login">LogIn</a></h1>
        </div>
      </div>
    </div>
  )
}
