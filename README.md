# CBDB Agentic RAG Chat

A modern, multilingual web application that provides access to the CBDB Agentic RAG (Retrieval Augmented Generation) Chat system. Built with Vite, Tailwind CSS, and featuring English/Chinese language support.

## 🚀 Features

- **Multilingual Support**: Full English/Chinese (简体中文) language toggle with content loaded from JSON files
- **Modern Web App**: Built with Vite + Tailwind CSS v3.4.17 for fast development and optimized builds
- **Professional Navigation**: Top menu bar with language toggle, About, Fullscreen, and Refresh functionality
- **RAG System Integration**: Attempts iframe embedding with intelligent fallback to direct access
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Enhanced UX**: Loading animations, status indicators, and micro-interactions
- **Keyboard Shortcuts**: L (launch), R (refresh), I (info), F11 (fullscreen), E (English), C (Chinese)
- **Internationalization**: Dynamic content loading from locale files with browser language detection
- **GitHub Pages Ready**: Configured for automatic deployment
- **Accessibility**: Proper ARIA labels, focus states, and semantic HTML

## 🌍 Multilingual Support

### Supported Languages
- **English** 🇺🇸 - Full interface translation
- **Chinese (Simplified)** 🇨🇳 - 完整的界面翻译

### Language Features
- **Auto-detection**: Automatically detects browser language on first visit
- **Persistent**: Language preference saved in localStorage
- **Dynamic switching**: Toggle between languages without page reload
- **Content from files**: All text loaded from JSON locale files (`src/locales/`)
- **Keyboard shortcuts**: Press `E` for English, `C` for Chinese

### Adding New Languages
1. Create a new locale file in `src/locales/` (e.g., `fr.json`)
2. Add the locale to `src/i18n.js` in the `locales` object
3. Update the language menu in `index.html`

## ⚙️ Configuration

### Easy URL Management
The Streamlit app URL is now **completely configurable** and no longer hardcoded!

#### **Configuration Files:**
```
app.config.json           # Main app configuration
src/locales/en.json       # English URLs and content
src/locales/zh.json       # Chinese URLs and content
```

#### **Changing the Streamlit URL:**
**Option 1: Global configuration (app.config.json)**
```json
{
  "streamlit": {
    "url": "https://your-new-app.streamlit.app/",
    "embedUrl": "https://your-new-app.streamlit.app/?embed=true"
  }
}
```

**Option 2: Per-language URLs (src/locales/en.json)**
```json
{
  "config": {
    "streamlitUrl": "https://your-english-app.streamlit.app/",
    "embedUrl": "https://your-english-app.streamlit.app/?embed=true"
  }
}
```

#### **Configuration Options:**
- **streamlit.url**: Direct access URL
- **streamlit.embedUrl**: Iframe embed URL
- **streamlit.loadTimeout**: How long to wait for loading (ms)
- **app.defaultLanguage**: Default language setting
- **ui.features**: Enable/disable specific features

## 📦 Setup

1. **Clone and install dependencies:**
   ```bash
   git clone <your-repo-url>
   cd cbdb_agent
   npm install
   ```

2. **Development:**
   ```bash
   npm run dev
   ```
   This will start the development server at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## 🌐 GitHub Pages Deployment

### Automatic Deployment (Recommended)

The repository includes a GitHub Actions workflow that automatically deploys to GitHub Pages when you push to the main branch.

**Setup Steps:**

1. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

2. **Update repository name:**
   - Edit `vite.config.js` and change the `base` property to match your repository name:
     ```js
     base: '/your-repo-name/',
     ```

3. **Push to main branch:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

The workflow will automatically build and deploy your app to `https://yourusername.github.io/your-repo-name/`

### Manual Deployment

If you prefer manual deployment:

```bash
npm run deploy
```

## 🔧 Configuration

### Vite Configuration

The `vite.config.js` file is configured for GitHub Pages deployment:

- `base`: Set to your repository name for proper asset paths
- `outDir`: Build output directory (dist)
- Development server runs on port 3000

### Streamlit App Integration

The app embeds the Streamlit application using an iframe with:

- **Security**: Appropriate sandbox attributes
- **Permissions**: Camera, microphone, clipboard access
- **Error Handling**: Fallback messaging if the app fails to load
- **Loading States**: Visual feedback during app initialization

## 🎨 Customization

### Styling

The app uses a modern gradient design with:
- Responsive layout
- Glassmorphism header
- Smooth animations
- Mobile-optimized interface

### JavaScript Features

- Iframe load state management
- Responsive behavior handling
- Fullscreen toggle (F11 key)
- Error handling and timeouts

## 🛠️ Troubleshooting

### Common Issues

1. **Streamlit app not loading:**
   - Check if `https://llamac.streamlit.app/` is accessible
   - CORS restrictions may prevent embedding
   - Fallback link is provided in the error message

2. **GitHub Pages deployment fails:**
   - Ensure GitHub Pages is enabled in repository settings
   - Check that the `base` path in `vite.config.js` matches your repo name
   - Verify the workflow has proper permissions

3. **Assets not loading:**
   - Confirm the `base` configuration matches your GitHub Pages URL structure

## 📱 Browser Compatibility

- Modern browsers with iframe support
- Responsive design for mobile devices
- Progressive enhancement for older browsers

## 🔒 Security Considerations

The iframe is configured with appropriate sandbox attributes to:
- Allow necessary Streamlit functionality
- Restrict potentially harmful operations
- Maintain security boundaries

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
