import { Message, SUMMARY_FORMAT, SUMMARY_LENGTH, SUMMARY_TYPE, SUPPORTED_LANGUAGES } from "./index";

interface MessageListProps {
  messages: Message[];
  onSummarize: (id: string, type: string, length: string, format: string) => void;
  onTranslate: (id: string) => void;
  selectedLanguage: string;
  onLanguageChange: (language: string) => void;

  selectedType: string;
  selectedLength: string;
  selectedFormat: string;

  onTypeChange: (type: string) => void;
  onLengthChange: (length: string) => void;
  onFormatChange: (format: string) => void;
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
  onLanguageChange,

  selectedType,
  selectedLength,
  selectedFormat,

  onTypeChange,
  onLengthChange,
  onFormatChange,
}: MessageListProps) {
  
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-6">
      {messages.map((message) => (
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

            <div className="mt-4 flex flex-col sm:flex-row gap-4">
              {message.text.length > 150 && message.language === 'en' && (
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-medium">Summary Type:</h1>
                    <select
                      value={selectedType}
                      onChange={(e) => onTypeChange(e.target.value)}
                      className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {SUMMARY_TYPE.map((type) => (
                        <option key={type.code} value={type.code}>
                          {type.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-medium">Summary Length:</h1>
                    <select
                      value={selectedLength}
                      onChange={(e) => onLengthChange(e.target.value)}
                      className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {SUMMARY_LENGTH.map((len) => (
                        <option key={len.code} value={len.code}>
                          {len.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex items-center gap-2">
                    <h1 className="text-sm font-medium">Summary Format:</h1>
                    <select
                      value={selectedFormat}
                      onChange={(e) => onFormatChange(e.target.value)}
                      className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    >
                      {SUMMARY_FORMAT.map((fmt) => (
                        <option key={fmt.code} value={fmt.code}>
                          {fmt.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    onClick={() =>
                      onSummarize(message.id, selectedType, selectedLength, selectedFormat)
                    }
                    className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors duration-200 cursor-pointer"
                  >
                    ✨ Summarize
                  </button>
                </div>
              )}

              <div className="flex items-center gap-2">
                <select
                  value={selectedLanguage}
                  onChange={(e) => onLanguageChange(e.target.value)}
                  className="px-4 py-2 bg-gray-50 rounded-lg text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-200"
                >
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => onTranslate(message.id)}
                  className="px-4 py-2 bg-green-50 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition-colors duration-200 cursor-pointer"
                >
                  🌐 Translate
                </button>
              </div>
            </div>

            {(message.summary || message.translation || message.isTranslating) && (
              <div className="mt-4 space-y-3">
                {message.summary && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-700 mb-1">Summary</h4>
                    <p className="text-sm text-blue-900">{message.summary}</p>
                  </div>
                )}

                {message.isTranslating && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <h4 className="text-sm font-medium text-gray-700 mb-1">Translating...</h4>
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
