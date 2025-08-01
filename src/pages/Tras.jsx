import React, { useState, useRef, useEffect } from 'react';
import { Camera, Send, MessageCircle, Video, VideoOff } from 'lucide-react';

export default function CameraChatApp() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to the chat!", sender: 'system', timestamp: new Date() }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isCameraOn, setIsCameraOn] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const messagesEndRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 640, height: 480 }, 
        audio: false 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        streamRef.current = stream;
        setIsCameraOn(true);
        setCameraError('');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCameraError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: 'user',
        timestamp: new Date()
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');

      setTimeout(() => {
        const response = {
          id: messages.length + 2,
          text: "Thanks for your message! This is a demo response.",
          sender: 'bot',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, response]);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div className="h-screen w-screen flex bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Camera Section */}
      <div className="w-1/2 p-6 flex flex-col">
        <div className="bg-black/20 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl h-full flex flex-col">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Camera className="w-6 h-6 text-purple-300" />
                </div>
                <h2 className="text-xl font-semibold text-white">Camera Feed</h2>
              </div>
              <button
                onClick={isCameraOn ? stopCamera : startCamera}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-200 ${
                  isCameraOn 
                    ? 'bg-red-500/20 text-red-300 hover:bg-red-500/30' 
                    : 'bg-green-500/20 text-green-300 hover:bg-green-500/30'
                }`}
              >
                {isCameraOn ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                {isCameraOn ? 'Stop' : 'Start'}
              </button>
            </div>
          </div>

          <div className="flex-1 p-6 flex items-center justify-center relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              width="640"
              height="480"
              style={{ border: '', zIndex: 9999, position: 'absolute', height : "85%", zIndex : "1"}}
              onLoadedMetadata={() => videoRef.current?.play()}
              className="top-9 left-0"
            />
          
           {(!isCameraOn && 
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 text-white text-center">
                <div className="flex flex-col items-center space-y-4 bg-gradient-to-br from-purple-900/50 to-black/40 backdrop-blur-lg rounded-2xl p-8 border border-purple-400/20 shadow-2xl">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-500/30 rounded-full animate-pulse"></div>
                    <div className="relative p-4 bg-purple-600/20 rounded-full backdrop-blur-sm border border-purple-400/30">
                      <Video size={28} className="text-purple-100" />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-lg font-medium text-purple-100">Camera Feed</div>
                    <div className="text-sm text-purple-200/70">Click Start to begin</div>
                  </div>
                </div>
              </div>
          )}

          </div>

          {cameraError && (
            <div className="px-6 pb-4 text-center text-red-400">{cameraError}</div>
          )}
        </div>
      </div>

      {/* Chat Section */}
      <div className="w-1/2 p-6 flex flex-col">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 shadow-2xl h-full flex flex-col">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <MessageCircle className="w-6 h-6 text-blue-300" />
              </div>
              <h2 className="text-xl font-semibold text-white">Chat</h2>
              <div className="ml-auto px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                    message.sender === 'user'
                      ? 'bg-purple-500/20 text-purple-100 rounded-br-sm'
                      : message.sender === 'system'
                      ? 'bg-yellow-500/20 text-yellow-200'
                      : 'bg-blue-500/20 text-blue-100 rounded-bl-sm'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-60 mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-6 border-t border-white/10">
            <div className="flex gap-3">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim()}
                className="px-4 py-3 bg-purple-500/20 text-purple-300 rounded-xl hover:bg-purple-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
