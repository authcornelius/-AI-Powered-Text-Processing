import { Message, SUPPORTED_LANGUAGES } from "./index";

interface MessageListProps {
  messages: Message[];
  onSummarize: (id: string) => void;
  onTranslate: (id: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;
}

const LANGUAGE_DISPLAY_NAMES: Record<string, string> = {
  en: 'English',
  pt: 'Portuguese',
  es: 'Spanish',
  ru: 'Russian',
  bg: 'Russian',
  tr: 'Turkish',
  fr: 'French'
};

export default function MessageList({
  messages,
  onSummarize,
  onTranslate,
  selectedLanguage,
  onLanguageChange
}: MessageListProps) {

  console.log(messages);
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map(message => (
        <div key={message.id} className="transform transition-all hover:scale-[1.01]">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <div className="prose max-w-none">
              <p className="text-gray-800 leading-relaxed">{message.text}</p>
            </div>

            {message.language && (
              <div className="flex items-center mt-3 text-sm text-gray-600">
                <span className="mr-2">Detected language:</span>
                <span className="inline-block px-2 py-1 bg-gray-100 rounded-md">
                  {LANGUAGE_DISPLAY_NAMES[message.language] || 'Unknown'}
                </span>
              </div>
            )}
            
            <div className="mt-4 flex flex-wrap gap-3">
              {message.text.length > 150 && message.language === 'en' && (
                <button
                  onClick={() => onSummarize(message.id)}
                  className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium
                           hover:bg-blue-100 transition-colors duration-200"
                >
                  ✨ Summarize
                </button>
              )}
              
              <div className="flex items-center gap-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200
                           focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {SUPPORTED_LANGUAGES.map(lang => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>
                
                <button
                  onClick={() => onTranslate(message.id)}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium
                           hover:bg-green-100 transition-colors duration-200"
                >
                  🌐 Translate
                </button>
              </div>
            </div>

            {(message.summary || message.translation) && (
              <div className="mt-4 space-y-3">
                {message.summary && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-700 mb-1">Summary</h4>
                    <p className="text-sm text-blue-900">{message.summary}</p>
                  </div>
                )}

                {message.translation && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="text-sm font-medium text-green-700 mb-1">Translation</h4>
                    <p className="text-sm text-green-900">{message.translation}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
