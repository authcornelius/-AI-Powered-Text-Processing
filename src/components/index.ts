export interface Message {
    id: string;
    text: string;
    language: string;
    summary: string;
    translation?: string;
    isTranslating?: boolean;
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

  export interface SettingsType {
    name: string;
    code: string;
  }

  export const SUMMARY_TYPE: SettingsType[] = [
    {name: 'Key Point', code: 'key-points'},
    // {name: 'TL;DR', code: 'tl-r'},
    {name: 'Teaser', code: 'teaser'},
    {name: 'Headline', code: 'headline'},
  ]

  export interface SettingsLength {
    name: string;
    code: string;
  }

  export const SUMMARY_LENGTH: SettingsLength[] = [
    {name: 'Short', code: 'short'},
    {name: 'Medium', code: 'medium'},
    {name: 'Long', code: 'long'}
  ]

  export interface SettingsFormat {
    name: string;
    code: string;
  }

  export const SUMMARY_FORMAT: SettingsFormat[] = [
    {name: 'Plain Text', code: 'plain-text'},
    {name: 'Markdown', code: 'markdown'}
  ]
