import { useState, useRef, useEffect } from 'react';

// Helper to extract userId from JWT
function getUserIdFromToken() {
  const token = localStorage.getItem('authToken');
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.id || payload.sub || null;
  } catch {
    return null;
  }
}

export default function AIChat() {
  const [messages, setMessages] = useState([
    { from: 'ai', text: 'Hello! How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMessage = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    // Show typing indicator
    setMessages((prev) => [...prev, { from: 'ai', text: '•••', typing: true }]);

    try {
      const token = localStorage.getItem('authToken');
      const userId = getUserIdFromToken();
      if (!userId) {
        setMessages((prev) => [
          ...prev.slice(0, -1), // remove typing indicator
          { from: 'ai', text: 'You must be logged in to chat.' }
        ]);
        setLoading(false);
        return;
      }
      const res = await fetch('https://ai-chatbot-dusky-tau.vercel.app/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({ userId, question: userMessage.text }),
      });
      const data = await res.json();
      setMessages((prev) => [
        ...prev.slice(0, -1), // remove typing indicator
        { from: 'ai', text: data.answer || 'Sorry, I did not understand that.' }
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev.slice(0, -1), // remove typing indicator
        { from: 'ai', text: 'Error: Unable to connect to AI server.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500">
      <div className="w-full max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-blue-100 dark:border-gray-700 flex flex-col h-[80vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-blue-100 dark:border-gray-700 flex items-center gap-2 bg-gradient-to-r from-blue-500/10 to-blue-100/10 dark:from-blue-900/20 dark:to-gray-800/20 rounded-t-2xl">
          <svg className="h-7 w-7 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="2" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01" /></svg>
          <h2 className="text-lg font-bold text-blue-700 dark:text-blue-300">AI Chat Assistant</h2>
        </div>
        {/* Chat messages */}
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4 bg-gradient-to-b from-blue-50/30 to-white/60 dark:from-gray-900/40 dark:to-gray-800/60">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md text-sm whitespace-pre-line break-words transition-all duration-300
                  ${msg.from === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-bl-none'}`}
              >
                {msg.typing ? (
                  <span className="inline-flex items-center gap-1">
                    <span className="animate-bounce">.</span>
                    <span className="animate-bounce delay-150">.</span>
                    <span className="animate-bounce delay-300">.</span>
                    <span className="ml-2 text-xs text-gray-400">AI is typing...</span>
                  </span>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        {/* Input area */}
        <form
          className="px-4 py-4 border-t border-blue-100 dark:border-gray-700 bg-gradient-to-r from-blue-100/30 to-white/10 dark:from-gray-900/30 dark:to-gray-800/10 rounded-b-2xl flex gap-2"
          onSubmit={e => { e.preventDefault(); sendMessage(); }}
        >
          <input
            className="flex-1 px-4 py-2 rounded-xl border border-blue-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 shadow-sm"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={loading}
            autoFocus
          />
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold shadow-lg transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading || !input.trim()}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 mx-auto" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
            ) : (
              'Send'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
