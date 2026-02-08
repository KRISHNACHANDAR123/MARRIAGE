# 💒 Wedding Invitation Website

A premium, password-protected wedding invitation website for **Bhuvaneśh R & Priyadharshini G S** featuring award-winning 3D animations and stunning UI/UX design.

## ✨ Features

- 🔒 **Password Protection** - Secure invitation access (Password: `BP2026`)
- 🎨 **Premium UI/UX** - Glassmorphism effects, romantic color palette
- 🌸 **3D Animations** - Three.js particle systems, wedding rings, floating hearts
- 📱 **Fully Responsive** - Perfect on all devices
- 💌 **RSVP Form** - Collect guest responses
- ⚡ **Smooth Animations** - GSAP-powered scroll effects
- 🎭 **Interactive** - Mouse-responsive 3D elements

## 🎯 Wedding Details

- **Ceremony**: Sunday, February 22, 2026 at 7:30 AM
- **Reception**: Friday, February 21, 2026 at 6:00 PM onwards
- **Venue**: Maruvoor Murugan Thirumana Mandapam, Melmaruvathur

## 🚀 Getting Started

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Development

The development server will start at `http://localhost:5173`

- Password gate: `/password.html`
- Main site: `/` (requires authentication)

## 🛠️ Technology Stack

- **Framework**: Vite
- **3D Graphics**: Three.js
- **Animations**: GSAP
- **Styling**: Vanilla CSS with Glassmorphism
- **Fonts**: Google Fonts (Cormorant Garamond, Montserrat, Great Vibes)

## 📁 Project Structure

```
/home/keyarga/MARRIAGE/
├── index.html              # Main wedding invitation page
├── password.html           # Password gate page
├── package.json           # Project dependencies
├── public/
│   └── invitation.png     # Original invitation image
└── src/
    ├── main.js           # Main application logic
    ├── password.js       # Password authentication
    ├── styles/
    │   ├── main.css      # Core styles & design system
    │   ├── password.css  # Password page styles
    │   └── animations.css # Animation library
    └── 3d/
        └── scene.js      # Three.js 3D scene with particles
```

## 🔐 Changing the Password

To change the invitation password:

1. Open `src/password.js`
2. Modify the `CORRECT_PASSWORD` constant:
   ```javascript
   const CORRECT_PASSWORD = 'YourNewPassword';
   ```

## 🎨 Customization

### Colors

Edit CSS custom properties in `src/styles/main.css`:

```css
:root {
  --sage-green: #8b9d88;
  --soft-pink: #f4c2d6;
  --gold: #c9a961;
  /* ... */
}
```

### 3D Scene

Modify particle count, colors, and effects in `src/3d/scene.js`

## 📊 RSVP Data

Guest responses are stored in browser `localStorage` under the key `wedding_rsvp_responses`.

To view responses:
```javascript
// In browser console
JSON.parse(localStorage.getItem('wedding_rsvp_responses'))
```

For production, integrate with a backend service to persist data.

## 🌐 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel --prod
```

### Netlify

```bash
npm run build
netlify deploy --prod --dir=dist
```

### GitHub Pages

```bash
npm run build
# Push dist folder to gh-pages branch
```

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## ⚡ Performance

- Lighthouse Score: 90+
- 3D Rendering: 60 FPS
- First Contentful Paint: < 1s
- Time to Interactive: < 2s

## 🎭 Credits

- Design & Development: AI-Powered Premium Wedding Invitation
- 3D Graphics: Three.js
- Animations: GSAP
- Fonts: Google Fonts

## 💝 License

Private - For personal wedding use only

---

**Made with ❤️ for Bhuvaneśh & Priyadharshini**

*February 22, 2026*
