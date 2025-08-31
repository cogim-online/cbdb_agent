// Configuration file for CBDB Agentic RAG Chat
// This file loads configuration from app.config.json and locale files

import appConfig from '../app.config.json';

export const config = appConfig;

// Helper function to get Streamlit URLs from current language config
export function getStreamlitUrls() {
  const currentLang = window.i18n?.getCurrentLanguage() || config.app.defaultLanguage;
  const translations = window.i18n?.translations;
  
  if (translations && translations.config) {
    return {
      url: translations.config.streamlitUrl,
      embedUrl: translations.config.embedUrl
    };
  }
  
  // Fallback to default config
  return {
    url: config.streamlit.url,
    embedUrl: config.streamlit.embedUrl
  };
}

// Helper function to update iframe source
export function updateIframeSrc() {
  const iframe = document.getElementById('streamlit-frame');
  const urls = getStreamlitUrls();
  
  if (iframe && urls.embedUrl) {
    iframe.src = urls.embedUrl;
    console.log(`Updated iframe source to: ${urls.embedUrl}`);
  }
}

// Helper function to get direct launch URL
export function getLaunchUrl() {
  const urls = getStreamlitUrls();
  return urls.url;
}

export default config;
