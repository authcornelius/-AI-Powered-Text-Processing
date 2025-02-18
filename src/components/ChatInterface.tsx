import { useState } from 'react';
import { detectLanguage, summarizeText, translateText } from '../utils/api';
import { Message } from './index';
import MessageList from './MessageList';
import InputArea from './InputArea';

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const [selectedType, setSelectedType] = useState('key-points');
  const [selectedLength, setSelectedLength] = useState('medium');
  const [selectedFormat, setSelectedFormat] = useState('markdown');

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      language: await detectLanguage(text),
      isTranslating: false
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
  };

  const handleSummarize = async (messageId: string, type: string, length: string, format: string) => {
    
    const messageIndex = messages.findIndex(m => m.id === messageId);
    if (messageIndex === -1) return;
  
    try {
      const updatedMessages = [...messages];
      updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], summary: "Generating summary..." };
      setMessages(updatedMessages);

      const filterData = {
        selectedType: type,
        selectedLength: length,
        selectedFormat: format,
      }
  
      // Generate a new summary
      const summary = await summarizeText(messages[messageIndex].text, filterData);
  
      // Update the message with the new summary
      updatedMessages[messageIndex] = { ...updatedMessages[messageIndex], summary: summary || "Summary failed" };
      setMessages(updatedMessages);
    } catch (error) {
      console.error('Summarization failed:', error);
    }
  };

  const handleTranslate = async (messageId: string) => {
    setMessages(prevMessages =>
      prevMessages.map(m =>
        m.id === messageId ? { ...m, isTranslating: true } : m
      )
    );

    const message = messages.find(m => m.id === messageId);
    if (!message) return;

    try {
      const translation = await translateText(message.text, message.language, selectedLanguage);
      
      
      setMessages(prevMessages =>
        prevMessages.map(m =>
          m.id === messageId ? { ...m, translation, isTranslating: false } : m
        )
      );
    } catch (error) {
      console.error('Translation failed:', error);
      setMessages(prevMessages =>
        prevMessages.map(m =>
          m.id === messageId ? { ...m, isTranslating: false } : m
        )
      );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 sticky top-0 bg-gray-50 p-10 rounded-lg shadow-md">
        AI Text Processor
      </h1>

      <MessageList
        messages={messages}
        onSummarize={handleSummarize}
        onTranslate={handleTranslate}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}

        selectedType={selectedType}
        selectedLength={selectedLength}
        selectedFormat={selectedFormat}

        onTypeChange={setSelectedType}
        onLengthChange={setSelectedLength}
        onFormatChange={setSelectedFormat}
      />
      <InputArea onSend={handleSend} />
    </div>
  );
}
