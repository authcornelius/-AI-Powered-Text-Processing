import { useState } from 'react';
import { IoIosSend } from 'react-icons/io';

interface InputAreaProps {
  onSend: (text: string) => void;
}

export default function InputArea({ onSend }: InputAreaProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex gap-2">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 p-2 border rounded-lg resize-none"
          placeholder="Type your message..."
          rows={3}
          aria-label="Message input"
        />
        <button
          type="submit"
          className="p-2 bg-blue-500 text-white rounded-lg"
          aria-label="Send message"
        >
          <IoIosSend size={24} />
        </button>
      </div>
    </form>
  );
}
