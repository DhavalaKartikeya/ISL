import React from 'react';
import { Camera, Video, MessageCircle, Users, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
export default function LandingPage() {
    const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/traslate');
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navigation Bar */}
      <nav className="fixed top-0 w-full bg-black/20 backdrop-blur-lg border-b border-white/10 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Camera className="w-6 h-6 text-purple-300" />
              </div>
              <span className="text-xl font-bold text-white">VidChat</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
            <button
              onClick={handleGetStarted}
              className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-lg hover:bg-purple-500/30 transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-300 text-sm mb-6">
              <Sparkles className="w-4 h-4" />
              <span>Experience the Future of Communication</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Connect Through
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"> Video </span>
              & Chat
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Seamlessly blend video calling with real-time messaging. 
              Experience crystal-clear communication in one beautiful interface.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={handleGetStarted}
              className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 shadow-2xl"
            >
              <span>Start Chatting</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white border border-white/20 font-semibold rounded-xl hover:bg-white/20 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="p-3 bg-purple-500/20 rounded-lg w-fit mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Video className="w-6 h-6 text-purple-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">HD Video Calls</h3>
              <p className="text-gray-400">Crystal-clear video communication with advanced camera controls and real-time streaming</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="p-3 bg-blue-500/20 rounded-lg w-fit mb-4 group-hover:bg-blue-500/30 transition-colors">
                <MessageCircle className="w-6 h-6 text-blue-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Chat</h3>
              <p className="text-gray-400">Instant messaging with rich text support, emoji reactions, and message history</p>
            </div>
            
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 hover:bg-white/10 transition-all duration-300 group">
              <div className="p-3 bg-green-500/20 rounded-lg w-fit mb-4 group-hover:bg-green-500/30 transition-colors">
                <Users className="w-6 h-6 text-green-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy to Use</h3>
              <p className="text-gray-400">Intuitive interface designed for seamless user experience and effortless navigation</p>
            </div>
          </div>

          {/* Additional CTA Section */}
          <div className="mt-20 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to get started?</h2>
            <p className="text-gray-300 mb-6">Join thousands of users already experiencing the future of communication</p>
            <button
              onClick={handleGetStarted}
              className="px-8 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105"
            >
              Launch VidChat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}