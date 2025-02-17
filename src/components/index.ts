export interface Message {
    id: string;
    text: string;
    language?: string;
    summary?: string;
    translation?: string;
  }
  
  export interface Language {
    code: string;
    name: string;
  }
  
  export const SUPPORTED_LANGUAGES: Language[] = [
    { code: 'en', name: 'English' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'es', name: 'Spanish' },
    { code: 'ru', name: 'Russian' },
    { code: 'tr', name: 'Turkish' },
    { code: 'fr', name: 'French' },
  ];
  