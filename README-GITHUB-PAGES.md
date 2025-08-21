# 🚀 BET Republican Team - GitHub Pages Deployment

This repository contains the static website for the Greenwich Republican Board of Estimate and Taxation (BET) endorsement campaign.

## 🌐 Live Website

The website is automatically deployed to GitHub Pages at:
**https://rarora2025.github.io/BET-Republicans/**

## 📁 Repository Structure

```
BET-Republicans/
├── .github/workflows/     # GitHub Actions for auto-deployment
├── public/                # Static website files
│   ├── index.html        # Main website (with backend)
│   ├── index-static.html # Static version for GitHub Pages
│   ├── styles.css        # CSS styles
│   ├── script.js         # JavaScript (with backend)
│   └── script-static.js  # Static JavaScript
├── server.js             # Express server (not used on GitHub Pages)
├── package.json          # Dependencies
└── README.md             # Main documentation
```

## 🚀 Deployment

### Automatic Deployment
The website automatically deploys to GitHub Pages when you push to the `main` branch.

### Manual Deployment
1. Push your changes to the `main` branch
2. GitHub Actions will automatically build and deploy
3. Check the Actions tab for deployment status

## 🔧 Local Development

### With Backend (Full Features)
```bash
npm install
npm start
# Visit http://localhost:3000
```

### Static Version (GitHub Pages Compatible)
```bash
# Open public/index-static.html in your browser
# Or serve with any static file server
```

## 📱 Features

- **Responsive Design** - Works on all devices
- **Endorsement Form** - Collect supporter information
- **Real-time Updates** - Live endorsement count
- **Beautiful Animations** - Smooth transitions and effects
- **Local Storage** - Endorsements saved in browser (static version)

## 🎨 Customization

### Colors
- Primary Blue: `#1e3a8a`
- Secondary Blue: `#3b82f6`
- Red: `#dc2626`
- Green: `#059669`

### Content
- Update candidate information in `index-static.html`
- Modify messaging in the message section
- Adjust styling in `styles.css`

## 📊 GitHub Pages Settings

1. Go to **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `gh-pages` (auto-created by GitHub Actions)
4. **Folder**: `/ (root)`

## 🔄 Update Process

1. Make changes to your files
2. Commit and push to `main` branch
3. GitHub Actions automatically deploys to `gh-pages`
4. Website updates within 2-5 minutes

## 🐛 Troubleshooting

### Website Not Updating
- Check GitHub Actions tab for deployment status
- Ensure you're pushing to `main` branch
- Wait 2-5 minutes for deployment to complete

### Styling Issues
- Clear browser cache
- Check browser console for errors
- Verify CSS file is loading correctly

### Form Not Working
- Ensure you're using `index-static.html` for GitHub Pages
- Check browser console for JavaScript errors
- Verify localStorage is enabled in browser

## 📞 Support

For technical issues with the website deployment, check:
1. GitHub Actions logs
2. Browser console errors
3. GitHub Pages settings

---

**Built for the Greenwich Republican BET Team** 🇺🇸
*Fiscal Responsibility • Transparency • Protecting Taxpayers*
