import { Message, SUPPORTED_LANGUAGES } from "./index";

interface MessageListProps {
  messages: Message[];
  onSummarize: (id: string) => void;
  onTranslate: (id: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

export default function MessageList({
  messages,
  onSummarize,
  onTranslate,
  selectedLanguage,
  onLanguageChange
}: MessageListProps) {
  
  return (
    <div className="flex-1 overflow-y-auto p-4">
      {messages.map(message => (
        <div key={message.id} className="mb-4">
          <div className="bg-white p-4 rounded-lg shadow">
            <p>{message.text}</p>
            {message.language && (
              <p className="text-sm text-gray-500 mt-2">
                Detected language: {
                  message.language === 'en' ? 'English' 
                  : message.language === 'pt' ? 'Portuguese' 
                  : message.language === 'es' ? 'Spanish'
                  : message.language === 'ru' || message.language === 'bg' ? 'Russian' 
                  : message.language === 'tr' ? 'Turkish'
                  : message.language === 'fr' ? 'French'
                  : 'Unknown'
                }
              </p>
            )}
            
            <div className="mt-2 flex gap-2">
              {message.text.length > 150 && message.language === 'en' && (
                <button
                  onClick={() => onSummarize(message.id)}
                  className="px-3 py-1 bg-gray-100 rounded-lg text-sm cursor-pointer"
                >
                  Summarize
                </button>
              )}
              
              <select
                value={selectedLanguage}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="px-3 py-1 bg-gray-100 rounded-lg text-sm"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
              
              <button
                onClick={() => onTranslate(message.id)}
                className="px-3 py-1 bg-gray-100 rounded-lg text-sm cursor-pointer"
              >
                Translate
              </button>
            </div>

            {message.summary && (
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <p className="text-sm">Summary: {message.summary}</p>
              </div>
            )}

            {message.translation && (
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <p className="text-sm">Translation: {message.translation}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
