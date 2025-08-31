// Main JavaScript file for the CBDB Agentic RAG Chat webapp
import './style.css'
import i18n from './i18n.js'
import { config, getStreamlitUrls, updateIframeSrc, getLaunchUrl } from './config.js'

console.log('🦙 CBDB Agentic RAG Chat webapp initialized');

// Get DOM elements
const iframe = document.getElementById('streamlit-frame');
const loading = document.getElementById('loading');
const iframeWrapper = document.getElementById('iframe-wrapper');
const fallbackContent = document.getElementById('fallback-content');
const connectionStatus = document.getElementById('connection-status');
const statusBar = document.getElementById('status-bar');
const infoModal = document.getElementById('info-modal');
const mobileMenu = document.getElementById('mobile-menu');
const languageMenu = document.getElementById('language-menu');
const currentFlag = document.getElementById('current-flag');

let iframeLoaded = false;
let fallbackShown = false;

// Initialize i18n and configuration
document.addEventListener('DOMContentLoaded', () => {
  i18n.updateDOM();
  updateLanguageUI();
  initializeUrls();
});

// Function to initialize URLs from configuration
function initializeUrls() {
  const urls = getStreamlitUrls();
  
  // Update iframe source
  if (iframe) {
    iframe.src = urls.embedUrl;
    iframe.title = i18n.t('app.title') + ' Application';
  }
  
  // Update all direct links
  updateDirectLinks();
  
  console.log(`Initialized with URLs - Direct: ${urls.url}, Embed: ${urls.embedUrl}`);
}

// Function to update language UI elements
function updateLanguageUI() {
  const currentLang = i18n.getCurrentLanguage();
  currentFlag.textContent = i18n.getLanguageFlag(currentLang);
}

// Function to update connection status
function updateConnectionStatus(status, message) {
  const statusDot = connectionStatus.querySelector('.w-2');
  const statusText = connectionStatus.querySelector('span');
  
  statusDot.className = 'w-2 h-2 rounded-full';
  
  switch(status) {
    case 'connecting':
      statusDot.classList.add('bg-yellow-400', 'animate-pulse');
      statusText.setAttribute('data-i18n', 'status.connecting');
      break;
    case 'connected':
      statusDot.classList.add('bg-green-400', 'animate-pulse');
      statusText.setAttribute('data-i18n', 'status.connected');
      statusBar.classList.remove('hidden');
      break;
    case 'failed':
      statusDot.classList.add('bg-red-400');
      statusText.setAttribute('data-i18n', 'status.failed');
      break;
  }
  
  // Update the text content
  statusText.textContent = i18n.t(statusText.getAttribute('data-i18n'));
}

// Function to show fallback content
function showFallback() {
  if (fallbackShown) return;
  
  console.log('Showing fallback content');
  fallbackShown = true;
  loading.classList.add('hidden');
  iframeWrapper.classList.add('hidden');
  fallbackContent.classList.remove('hidden');
  fallbackContent.classList.add('flex');
  updateConnectionStatus('failed');
}

// Function to show iframe successfully
function showIframe() {
  console.log('Showing iframe content');
  iframeLoaded = true;
  loading.classList.add('hidden');
  fallbackContent.classList.add('hidden');
  fallbackContent.classList.remove('flex');
  updateConnectionStatus('connected');
}

// Handle iframe load event
iframe.addEventListener('load', () => {
  console.log('Iframe load event triggered');
  
  // Set a short delay to let the iframe content settle
  setTimeout(() => {
    try {
      // Try to detect if we got redirected or blocked
      const iframeWindow = iframe.contentWindow;
      
      // If we can access the iframe and it has content, consider it successful
      if (iframeWindow) {
        showIframe();
        return;
      }
    } catch (error) {
      // Cross-origin restrictions are expected
      console.log('Cross-origin restrictions detected (this is normal)');
    }
    
    // For cross-origin content, we assume it loaded if we got to this point
    showIframe();
  }, 1500);
});

// Handle iframe error event
iframe.addEventListener('error', (error) => {
  console.error('Iframe error event:', error);
  showFallback();
});

// Timeout fallback - configurable timeout
const timeoutId = setTimeout(() => {
  if (!iframeLoaded && !fallbackShown) {
    console.warn('Iframe loading timeout - showing fallback');
    showFallback();
  }
}, config.streamlit.loadTimeout);

// Language functions
window.toggleLanguageMenu = function() {
  languageMenu.classList.toggle('hidden');
}

window.switchLanguage = function(lang) {
  console.log(`Switching to language: ${lang}`);
  i18n.setLanguage(lang);
  updateLanguageUI();
  languageMenu.classList.add('hidden');
  
  // Update iframe source with new language config
  updateIframeSrc();
  
  // Update all direct links with new URL
  updateDirectLinks();
  
  // Update dynamic status messages
  if (connectionStatus) {
    updateConnectionStatus(iframeLoaded ? 'connected' : 'connecting');
  }
}

// Navigation functions
window.toggleMobileMenu = function() {
  mobileMenu.classList.toggle('hidden');
}

window.showInfo = function() {
  infoModal.classList.remove('hidden');
  infoModal.classList.add('flex');
}

window.hideInfo = function() {
  infoModal.classList.add('hidden');
  infoModal.classList.remove('flex');
}

window.hideStatusBar = function() {
  statusBar.classList.add('hidden');
}

window.refreshApp = function() {
  if (iframeLoaded) {
    // Use configured URL for refresh
    const urls = getStreamlitUrls();
    iframe.src = urls.embedUrl;
    updateConnectionStatus('connecting');
    iframeLoaded = false;
    fallbackShown = false;
    loading.classList.remove('hidden');
    fallbackContent.classList.add('hidden');
    iframeWrapper.classList.remove('hidden');
  } else {
    location.reload();
  }
}

// Function to update all direct links
function updateDirectLinks() {
  const launchUrl = getLaunchUrl();
  const directLinks = document.querySelectorAll('.streamlit-link');
  
  directLinks.forEach(link => {
    link.href = launchUrl;
    console.log(`Updated link href to: ${launchUrl}`);
  });
}

window.toggleFullscreen = function() {
  const appContainer = document.querySelector('.card-solid');
  if (!document.fullscreenElement) {
    appContainer.requestFullscreen().catch(err => {
      console.log(`Error attempting to enable fullscreen: ${err.message}`);
      // Fallback: hide navigation for pseudo-fullscreen
      document.querySelector('nav').classList.toggle('hidden');
    });
  } else {
    document.exitFullscreen();
  }
}

// Enhanced keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Prevent shortcuts when typing in inputs
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  
  switch(e.key.toLowerCase()) {
    case 'l':
      if (!e.ctrlKey && !e.metaKey) {
        const launchUrl = getLaunchUrl();
        window.open(launchUrl, '_blank');
      }
      break;
    case 'r':
      if (!e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        refreshApp();
      }
      break;
    case 'i':
      if (!e.ctrlKey && !e.metaKey) {
        showInfo();
      }
      break;
    case 'escape':
      hideInfo();
      mobileMenu.classList.add('hidden');
      languageMenu.classList.add('hidden');
      break;
    case 'f11':
      e.preventDefault();
      toggleFullscreen();
      break;
    case 'e':
      if (!e.ctrlKey && !e.metaKey) {
        switchLanguage('en');
      }
      break;
    case 'c':
      if (!e.ctrlKey && !e.metaKey) {
        switchLanguage('zh');
      }
      break;
  }
});

// Close menus when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav') && !mobileMenu.classList.contains('hidden')) {
    mobileMenu.classList.add('hidden');
  }
  
  if (!e.target.closest('#language-toggle') && !e.target.closest('#language-menu')) {
    languageMenu.classList.add('hidden');
  }
});

// Close modal when clicking outside
infoModal.addEventListener('click', (e) => {
  if (e.target === infoModal) {
    hideInfo();
  }
});

// Initialize connection status
updateConnectionStatus('connecting');

// Enhanced iframe detection with better UX
function detectIframeBlocking() {
  setTimeout(() => {
    if (!iframeLoaded && !fallbackShown) {
      try {
        // Check iframe dimensions - blocked iframes often have 0 dimensions
        const rect = iframe.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          console.warn('Iframe has zero dimensions - likely blocked');
          showFallback();
          return;
        }
        
      } catch (error) {
        console.log('Error during iframe detection:', error.message);
      }
    }
  }, config.streamlit.detectionTimeout);
}

// Run iframe blocking detection
detectIframeBlocking();

// Handle responsive behavior
function handleResize() {
  // Ensure iframe fills its container properly
  if (iframe && iframeWrapper) {
    iframe.style.width = '100%';
    iframe.style.height = '100%';
  }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);

// Listen for language changes
window.addEventListener('languageChanged', (e) => {
  console.log(`Language changed to: ${e.detail.language}`);
  
  // Update any dynamic content that might not be covered by data-i18n
  document.title = i18n.t('app.title');
  
  // Update iframe title
  iframe.title = i18n.t('app.title') + ' Application';
});

// Add some visual feedback for interactions
document.addEventListener('DOMContentLoaded', () => {
  // Add hover effects to interactive elements
  const buttons = document.querySelectorAll('button, a');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', () => {
      if (!button.classList.contains('no-hover-effect')) {
        button.style.transform = 'translateY(-1px)';
      }
    });
    
    button.addEventListener('mouseleave', () => {
      if (!button.classList.contains('no-hover-effect')) {
        button.style.transform = 'translateY(0)';
      }
    });
  });
});

console.log('🌍 Multilingual CBDB Agentic RAG Chat loaded');
console.log('📋 Available shortcuts: L (launch), R (refresh), I (info), F11 (fullscreen), E (English), C (Chinese), ESC (close)');
console.log(`🗣️ Current language: ${i18n.getLanguageDisplayName(i18n.getCurrentLanguage())}`);