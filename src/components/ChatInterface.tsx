import { useState } from 'react';
import { detectLanguage, summarizeText, translateText } from '../utils/api';
import { Message } from './index';
import MessageList from './MessageList';
import InputArea from './InputArea';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      language: await detectLanguage(text)
    };

    setMessages([...messages, newMessage]);
  };


  const handleSummarize = async (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    try {
      const summary = await summarizeText(message.text);
      setMessages(
        messages.map(m =>
          m.id === messageId ? { ...m, summary: summary as string } : m
        )
      );
    } catch (error) {
      console.error('Summarization failed:', error);
    }
  };

  const handleTranslate = async (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (!message) return;
    
    const language: string = message.language; // Ensure language is explicitly typed
  
    try {
      const translation = await translateText(message.text, language, selectedLanguage,);
      setMessages(messages.map(m => 
        m.id === messageId ? { ...m, translation } : m
      ));
    } catch (error) {
      console.error('Translation failed:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <MessageList
        messages={messages}
        onSummarize={handleSummarize}
        onTranslate={handleTranslate}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
      />
      <InputArea onSend={handleSend} />
    </div>
  );
}
