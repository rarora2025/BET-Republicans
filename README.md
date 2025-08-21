# 🚀 BET Republican Team Endorsement Website

A dynamic, animated website for collecting endorsements for the Greenwich Republican Board of Estimate and Taxation (BET) team. Features real-time updates, beautiful animations, and a SQLite database.

## ✨ Features

- **🎨 Modern Design**: Beautiful, responsive design with smooth animations
- **📝 Endorsement Form**: Easy-to-use form for collecting supporter information
- **🔄 Real-time Updates**: Live endorsement count and recent submissions
- **💾 Database Storage**: SQLite database for persistent data storage
- **📱 Mobile Responsive**: Works perfectly on all devices
- **🎭 Smooth Animations**: CSS animations and JavaScript effects
- **🎊 Celebration Effects**: Confetti and animations on successful submissions
- **⚡ Fast Performance**: Optimized for quick loading and smooth interactions

## 🏗️ Tech Stack

- **Backend**: Node.js + Express.js
- **Database**: SQLite3
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Styling**: Custom CSS with Tailwind-inspired design
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or download the project**
   ```bash
   cd BET
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Build

```bash
npm start
```

## 📁 Project Structure

```
BET/
├── public/                 # Static files
│   ├── index.html         # Main HTML file
│   ├── styles.css         # CSS styles
│   └── script.js          # JavaScript functionality
├── server.js              # Express server
├── package.json           # Dependencies and scripts
├── README.md              # This file
└── endorsements.db        # SQLite database (created automatically)
```

## 🎯 How It Works

### 1. **Hero Section**
- Displays the Republican team with animated candidate cards
- Features a patriotic design with the American flag icon
- Smooth scroll indicator to guide users

### 2. **Message Section**
- Explains the purpose and importance of endorsements
- Call-to-action button to scroll to the form

### 3. **Statistics Section**
- Real-time endorsement count
- Number of candidates (6)
- Republican commitment (100%)

### 4. **Endorsement Form**
- Collects supporter information:
  - Full Name (required)
  - Email Address (required)
  - Phone Number (optional)
  - Address (optional)
  - Personal Message (optional)
- Real-time validation and focus effects

### 5. **Recent Endorsements**
- Displays the latest 6 endorsements
- Animated cards with submission dates
- Real-time updates as new endorsements are added

## 🗄️ Database Schema

The SQLite database automatically creates a table with the following structure:

```sql
CREATE TABLE endorsements (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    address TEXT,
    message TEXT,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🔌 API Endpoints

- `GET /` - Main website
- `GET /api/endorsements` - Get all endorsements
- `GET /api/endorsements/count` - Get endorsement count
- `POST /api/endorsements` - Submit new endorsement

## 🎨 Customization

### Colors
The website uses a patriotic color scheme:
- Primary Blue: `#1e3a8a`
- Secondary Blue: `#3b82f6`
- Red: `#dc2626`
- Green: `#059669`
- Gold: `#fbbf24`

### Animations
- Fade-in effects on scroll
- Hover animations on cards
- Smooth transitions throughout
- Confetti celebration effects

## 📱 Responsive Design

The website is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All modern browsers

## 🚀 Deployment

### Local Development
```bash
npm run dev
```

### Production
```bash
npm start
```

### Environment Variables
- `PORT`: Server port (default: 3000)

## 🔧 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the port in `server.js` or kill the process using the port

2. **Database errors**
   - Delete `endorsements.db` and restart the server
   - Check file permissions

3. **Dependencies not found**
   - Run `npm install` again
   - Clear `node_modules` and reinstall

### Performance Tips

- The website is optimized for fast loading
- Images are optimized and use efficient formats
- CSS and JavaScript are minified for production
- Database queries are optimized with proper indexing

## 🤝 Contributing

This is a political campaign website. Please ensure all contributions align with the campaign's goals and messaging.

## 📄 License

This project is for the Greenwich Republican BET campaign. All rights reserved.

## 📞 Support

For technical support or questions about the website, please contact the campaign team.

---

**Built with ❤️ for the Greenwich Republican BET Team**

*Fiscal Responsibility • Transparency • Protecting Taxpayers*
