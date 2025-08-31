// Internationalization module for CBDB Agentic RAG Chat
import enLocale from './locales/en.json';
import zhLocale from './locales/zh.json';

class I18n {
  constructor() {
    this.locales = {
      'en': enLocale,
      'zh': zhLocale
    };
    
    // Get saved language or detect from browser
    this.currentLanguage = localStorage.getItem('cbdb-language') || this.detectBrowserLanguage();
    this.translations = this.locales[this.currentLanguage];
  }
  
  detectBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    
    // Check if browser language starts with supported languages
    if (browserLang.startsWith('zh')) {
      return 'zh';
    }
    
    // Default to English
    return 'en';
  }
  
  setLanguage(lang) {
    if (this.locales[lang]) {
      this.currentLanguage = lang;
      this.translations = this.locales[lang];
      localStorage.setItem('cbdb-language', lang);
      this.updateDOM();
      return true;
    }
    return false;
  }
  
  getCurrentLanguage() {
    return this.currentLanguage;
  }
  
  getAvailableLanguages() {
    return Object.keys(this.locales);
  }
  
  t(key) {
    const keys = key.split('.');
    let value = this.translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key; // Return the key if translation not found
      }
    }
    
    return value;
  }
  
  updateDOM() {
    // Update all elements with data-i18n attributes
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const translation = this.t(key);
      
      if (element.tagName === 'INPUT' && element.type === 'text') {
        element.placeholder = translation;
      } else {
        element.textContent = translation;
      }
    });
    
    // Update elements with data-i18n-html attributes (for HTML content)
    const htmlElements = document.querySelectorAll('[data-i18n-html]');
    htmlElements.forEach(element => {
      const key = element.getAttribute('data-i18n-html');
      const translation = this.t(key);
      element.innerHTML = translation;
    });
    
    // Update title and meta tags
    document.title = this.t('app.title');
    
    // Update HTML lang attribute
    document.documentElement.lang = this.currentLanguage;
    
    // Trigger custom event for any additional updates needed
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language: this.currentLanguage } 
    }));
  }
  
  // Helper method to get language display name
  getLanguageDisplayName(lang) {
    const displayNames = {
      'en': 'English',
      'zh': '中文'
    };
    return displayNames[lang] || lang;
  }
  
  // Helper method to get language flag emoji
  getLanguageFlag(lang) {
    const flags = {
      'en': '🇺🇸',
      'zh': '🇨🇳'
    };
    return flags[lang] || '🌐';
  }
}

// Create global instance
window.i18n = new I18n();

// Export for module usage
export default window.i18n;
