# 🚀 GitHub Pages Deployment Guide

This guide will walk you through deploying your **CBDB Agentic RAG Chat** application to GitHub Pages.

## 📋 Prerequisites

Before you begin, make sure you have:
- ✅ A GitHub account
- ✅ Git installed on your computer
- ✅ Your project files ready (this repository)

## 🎯 Quick Deployment (5 minutes)

### Step 1: Create GitHub Repository

1. **Go to GitHub** and click the "+" icon → "New repository"
2. **Repository name**: `cbdb-agentic-rag-chat` (or your preferred name)
3. **Visibility**: Public (required for free GitHub Pages)
4. **Don't initialize** with README, .gitignore, or license (we already have these)
5. **Click "Create repository"**

### Step 2: Configure Repository Name

Before pushing, update the repository name in your configuration:

```bash
# Edit vite.config.js - update the base path to match your repo name
# Change line 4: base: '/your-repo-name/',
```

**Example:** If your repo is named `my-rag-chat`, change:
```js
base: '/my-rag-chat/',
```

### Step 3: Push Your Code

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: CBDB Agentic RAG Chat multilingual app"

# Set main branch
git branch -M main

# Add GitHub repository as origin (replace with your URL)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git

# Push to GitHub
git push -u origin main
```

### Step 4: Enable GitHub Pages

1. **Go to your repository** on GitHub
2. **Click "Settings"** tab
3. **Scroll down** to "Pages" section in the left sidebar
4. **Under "Source"**, select **"GitHub Actions"**
5. **Save** the settings

### Step 5: Wait for Deployment

1. **Go to "Actions"** tab in your repository
2. **Watch the deployment** workflow run (takes 2-3 minutes)
3. **Once complete**, your app will be available at:
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
   ```

## 🎉 That's It!

Your multilingual CBDB Agentic RAG Chat is now live on GitHub Pages!

---

## 🔧 Advanced Configuration

### Customizing the Streamlit URL

Before deployment, you can change the Streamlit app URL:

#### Option 1: Global Configuration
Edit `app.config.json`:
```json
{
  "streamlit": {
    "url": "https://your-streamlit-app.streamlit.app/",
    "embedUrl": "https://your-streamlit-app.streamlit.app/?embed=true"
  }
}
```

#### Option 2: Per-Language URLs
Edit `src/locales/en.json` and `src/locales/zh.json`:
```json
{
  "config": {
    "streamlitUrl": "https://your-english-app.streamlit.app/",
    "embedUrl": "https://your-english-app.streamlit.app/?embed=true"
  }
}
```

### Custom Domain (Optional)

If you want to use a custom domain:

1. **Add CNAME file** in the `public/` directory:
   ```bash
   mkdir public
   echo "yourdomain.com" > public/CNAME
   ```

2. **Configure your domain** DNS to point to GitHub Pages
3. **Enable custom domain** in repository Settings → Pages

## 🔄 Updating Your Deployment

### Making Changes

1. **Edit your files** locally
2. **Test changes**:
   ```bash
   npm run dev
   ```
3. **Build and test**:
   ```bash
   npm run build
   npm run preview
   ```

### Deploy Updates

```bash
# Add changes
git add .

# Commit with descriptive message
git commit -m "Update: describe your changes"

# Push to GitHub
git push origin main
```

The GitHub Actions workflow will **automatically rebuild and deploy** your changes!

## 🛠️ Manual Deployment (Alternative)

If you prefer manual deployment using gh-pages:

```bash
# Build the project
npm run build

# Deploy to gh-pages branch
npm run deploy
```

## 📊 Monitoring Deployment

### Check Deployment Status

1. **Actions Tab**: See build and deployment progress
2. **Environments**: View deployment history and status
3. **Pages Settings**: See your live URL and deployment source

### Common Deployment URLs

Your app will be available at one of these patterns:
```
https://USERNAME.github.io/REPO_NAME/
https://USERNAME.github.io/REPO_NAME/index.html
```

## 🐛 Troubleshooting

### Build Fails

**Problem**: Build fails in GitHub Actions
**Solution**: 
1. Check the Actions tab for error details
2. Ensure all dependencies are in `package.json`
3. Test build locally: `npm run build`

### 404 Page Not Found

**Problem**: GitHub Pages shows 404
**Solutions**:
1. **Check base path** in `vite.config.js` matches your repository name
2. **Verify Pages source** is set to "GitHub Actions"
3. **Wait 5-10 minutes** for DNS propagation

### Assets Not Loading

**Problem**: CSS/JS files return 404
**Solutions**:
1. **Verify base path** in `vite.config.js`:
   ```js
   base: '/your-exact-repo-name/',
   ```
2. **Check repository name** matches exactly (case-sensitive)

### Streamlit App Not Loading

**Problem**: Iframe shows error or blank page
**Solutions**:
1. **Check Streamlit URL** in `app.config.json`
2. **Test URL directly** in browser
3. **CORS restrictions** - this is normal, fallback will show

## 📱 Testing Your Deployment

### Verification Checklist

After deployment, verify:
- ✅ **App loads** at your GitHub Pages URL
- ✅ **Language toggle** works (English ↔ Chinese)
- ✅ **Streamlit integration** works (iframe or fallback)
- ✅ **Responsive design** works on mobile
- ✅ **Navigation menu** functions properly
- ✅ **Keyboard shortcuts** work (L, R, I, F11, E, C)

### Performance Testing

```bash
# Test build size
npm run build
ls -la dist/

# Test preview locally
npm run preview
```

## 🎯 Production Checklist

Before going live:
- [ ] **Update Streamlit URL** in configuration files
- [ ] **Test all language combinations**
- [ ] **Verify responsive design** on different devices
- [ ] **Check keyboard shortcuts**
- [ ] **Test iframe embedding** and fallback
- [ ] **Validate all links** work correctly
- [ ] **Review console** for any errors

## 🔄 Continuous Deployment

Your app is configured for **automatic deployment**:
- ✅ **Push to main** → Automatic build and deploy
- ✅ **Pull requests** → Build testing (no deploy)
- ✅ **Error handling** → Failed builds won't deploy
- ✅ **Rollback support** → Previous versions remain accessible

## 📞 Support

If you encounter issues:
1. **Check the Actions tab** for build logs
2. **Review this guide** for common solutions
3. **Test locally first** with `npm run build`
4. **Verify configuration** files are correct

## 🎉 Success!

Once deployed, share your app:
```
🌐 Live App: https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
🔗 Repository: https://github.com/YOUR_USERNAME/YOUR_REPO_NAME
```

Your **CBDB Agentic RAG Chat** is now live with:
- ✅ **Multilingual support** (English/Chinese)
- ✅ **Professional UI** with dark blue theme
- ✅ **Streamlit integration** with smart fallback
- ✅ **Mobile optimization**
- ✅ **Automatic updates** on every push

Congratulations! 🎊
