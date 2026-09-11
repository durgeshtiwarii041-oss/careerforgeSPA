import React, { useState, useRef, useEffect } from "react";
import { Send, X, Paperclip, Smile } from "lucide-react";

export default function ChatWindow({ conversation, onClose, onSend }) {
  const [messages, setMessages] = useState(conversation.messages);
  const [text, setText] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Sync with conversation when it changes externally
  useEffect(() => {
    setMessages(conversation.messages);
  }, [conversation.messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg = { id: Date.now(), sender: "user", senderName: "You", text: text.trim(), time, date: "Today" };
    setMessages(prev => [...prev, newMsg]);
    setText("");
    setShowEmoji(false);

    if (onSend) {
      onSend(text.trim());
    }
  };

  const addEmoji = (emoji) => {
    setText(t => t + emoji);
    setShowEmoji(false);
  };

  const emojis = ["👍", "😊", "💪", "🔥", "🤔", "✅", "📚", "🚀"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 p-4 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <img
            src={conversation.mentorPhoto}
            alt={conversation.mentorName}
            className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{conversation.mentorName}</h3>
            <p className="text-xs text-blue-100">Active now</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {messages.map(m => (
            <div key={m.id} className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}>
              {m.sender === "mentor" && (
                <img src={conversation.mentorPhoto} alt="" className="w-7 h-7 rounded-full object-cover mt-1 flex-shrink-0" />
              )}
              <div className={`max-w-[75%] mx-2`}>
                {m.sender === "mentor" && (
                  <p className="text-xs font-medium text-slate-500 mb-0.5 ml-1">{m.senderName}</p>
                )}
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    m.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-md"
                      : "bg-white text-slate-800 border border-slate-200 rounded-bl-md"
                  }`}
                >
                  {m.text}
                </div>
                <p className="text-[10px] text-slate-400 mt-1 mx-1">{m.time}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {showEmoji && (
          <div className="flex gap-2 p-3 border-t border-slate-200 bg-white flex-wrap">
            {emojis.map(e => (
              <button key={e} onClick={() => addEmoji(e)} className="text-xl hover:scale-125 transition-transform">
                {e}
              </button>
            ))}
          </div>
        )}

        <div className="p-3 border-t border-slate-200 bg-white">
          <div className="flex items-end gap-2">
            <button
              onClick={() => setShowEmoji(!showEmoji)}
              className="p-2.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Add emoji"
            >
              <Smile size={20} />
            </button>
            <button
              className="p-2.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              title="Attach file (demo)"
            >
              <Paperclip size={20} />
            </button>
            <textarea
              value={text}
              onChange={e => setText(e.target.value)}
              onKeyDown={e => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Type a message..."
              rows={1}
              className="flex-1 input resize-none py-2.5"
            />
            <button
              onClick={handleSend}
              disabled={!text.trim()}
              className="p-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              title="Send message"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}