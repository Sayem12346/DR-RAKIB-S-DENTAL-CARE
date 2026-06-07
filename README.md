# 🦷 Dr. Rakib's Dental Care - Premium Website

A high-end, Cyber Serif-styled dental care website for **Dr. Md. Rakibul Hasan** in Chattogram, Bangladesh.

## ✨ Features

### Design System (Cyber Serif)
- **Typography**: Newsreader (Serif headings), Inter (Body), Space Grotesk (Technical labels)
- **Color Palette**: Deep Black (#050505), Emerald Accent (#10b981), Soft White (#EBEBEB)
- **Effects**: Glassmorphism, Shimmer borders, Spotlight cursor tracking, Morphing background glows
- **Animations**: Scroll reveals with cubic-bezier(0.16, 1, 0.3, 1), Animated counters, Pulse glows

### Sections
1. **Hero** - WebGL Circular Gallery showcasing clinic images
2. **Services** - 11 dental services with Spotlight Cards
3. **About** - Doctor profile with animated stats
4. **Pricing** - Transparent pricing table
5. **Testimonials** - Patient reviews
6. **Notice Center** - Admin-managed announcements
7. **Blog** - Dental awareness articles
8. **Appointment** - Full booking form
9. **Contact** - Google Maps + contact details

### Special Components
- **CircularGallery** (WebGL/OGL) - 3D curved image gallery with inertia scrolling
- **SpotlightCard** - Mouse-tracking radial gradient illumination
- **ShimmerBorder** - Animated light effect on card edges
- **AnimatedCounter** - IntersectionObserver-triggered number counting

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# 1. Create React app with TypeScript
npx create-react-app dr-rakib-dental --template typescript

# 2. Navigate to project
cd dr-rakib-dental

# 3. Install dependencies
npm install ogl@^0.0.116 lucide-react@^0.454.0 tailwindcss@^3.4.0 autoprefixer@^10.4.16 postcss@^8.4.32

# 4. Initialize Tailwind
npx tailwindcss init -p

# 5. Copy files from this project:
#    - App.tsx -> src/App.tsx
#    - CircularGallery.tsx -> src/CircularGallery.tsx
#    - index.css -> src/index.css
#    - index.tsx -> src/index.tsx
#    - index.html -> public/index.html
#    - tailwind.config.js -> root/
#    - postcss.config.js -> root/

# 6. Add images to public/images/ folder:
#    - doctor.jpg (Dr. Rakib's photo)
#    - clinic.jpg (Clinic interior)
#    - scaling-before.jpg / scaling-after.jpg
#    - xray.jpg (Digital X-ray)
#    - rct.jpg (Root canal treatment)

# 7. Start development server
npm start

# 8. Build for production
npm run build
```

### File Structure
```
dr-rakib-dental/
├── public/
│   ├── index.html
│   └── images/
│       ├── doctor.jpg
│       ├── clinic.jpg
│       ├── scaling-before.jpg
│       ├── scaling-after.jpg
│       ├── xray.jpg
│       └── rct.jpg
├── src/
│   ├── App.tsx              # Main application
│   ├── CircularGallery.tsx  # WebGL gallery component
│   ├── index.tsx            # Entry point
│   └── index.css            # Global styles + Tailwind
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## 🔗 Google Reviews Integration

### Method 1: Embed Google Reviews Widget (Recommended)
Use a third-party widget service:

**Option A: Elfsight Google Reviews Widget**
1. Go to [elfsight.com](https://elfsight.com/google-reviews-widget/)
2. Create account and connect your Google Business Profile
3. Customize widget style (Dark theme to match #050505)
4. Get embed code
5. Add to Testimonials section in App.tsx:

```tsx
// In TestimonialsSection, replace or add alongside existing testimonials:
<div className="mt-12">
  <div className="elfsight-app-YOUR_WIDGET_ID" />
</div>
// Add script tag in index.html:
<script src="https://apps.elfsight.com/p/platform.js" defer></script>
```

**Option B: Embed Social (Free)**
1. Go to [embedsocial.com](https://embedsocial.com/)
2. Connect Google Business
3. Generate embed code
4. Paste in Testimonials section

### Method 2: Manual Google Reviews Badge
Add a static badge linking to your Google Business reviews:

```tsx
<a 
  href="https://g.page/r/YOUR_GOOGLE_BUSINESS_ID/review" 
  target="_blank" 
  rel="noopener noreferrer"
  className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-6 py-3 hover:bg-white/10 transition-colors"
>
  <img src="/google-icon.svg" className="w-5 h-5" alt="Google" />
  <span className="text-white text-sm">Read our 4.9★ Google Reviews</span>
  <span className="text-emerald-400 text-sm font-bold">(127 reviews)</span>
</a>
```

### Method 3: Google Places API (Advanced)
For dynamic loading (requires backend):

```javascript
// Backend endpoint (Node.js/Express example)
const { google } = require('googleapis');

app.get('/api/reviews', async (req, res) => {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/details/json?` +
    `place_id=YOUR_PLACE_ID&` +
    `fields=reviews,rating,user_ratings_total&` +
    `key=YOUR_GOOGLE_API_KEY`
  );
  const data = await response.json();
  res.json(data.result.reviews);
});
```

### Setting Up Google Business Profile
1. Go to [Google Business Profile](https://business.google.com/)
2. Claim/verify "Dr. Rakib's Dental Care"
3. Address: S.A. Complex (2nd Floor), Rahattarpol, Chattogram 4000
4. Phone: 01642-778552
5. Hours: 10AM-1PM, 5PM-10PM (Fri Closed)
6. Add photos of clinic, doctor, treatments
7. Encourage patients to leave reviews

## 🗺️ Google Maps Integration

The map is already embedded using an iframe. To get your exact Place ID:

1. Go to [Google Maps](https://maps.google.com)
2. Search: "S.A. Complex, Rahattarpol, Chattogram"
3. Click "Share" → "Embed a map"
4. Copy the iframe src URL
5. Replace `CLINIC_INFO.mapUrl` in App.tsx

## 📱 WhatsApp Integration

The WhatsApp button is already functional:
- Floating emergency button links to `https://wa.me/01642778552`
- Appointment page includes WhatsApp booking option

To enable WhatsApp Business API (for automated notifications):
1. Apply at [business.whatsapp.com](https://business.whatsapp.com/products/business-platform)
2. Or use [Twilio WhatsApp API](https://www.twilio.com/whatsapp)

## 🔔 Notification System (Backend)

### Required Backend Stack
```
Node.js + Express + MongoDB + Twilio/SendGrid
```

### API Endpoints Needed
```javascript
// POST /api/appointments - Store appointment
// GET /api/appointments - Admin view all
// PUT /api/appointments/:id/status - Update status
// POST /api/notices - Create notice
// GET /api/notices - Public view
// POST /api/notifications/whatsapp - Send WhatsApp
// POST /api/notifications/email - Send email
```

### WhatsApp Notification Template
```javascript
const message = `🦷 *New Appointment Request*

*Patient:* ${formData.name}
*Phone:* ${formData.phone}
*Service:* ${serviceName}
*Date:* ${formData.date}
*Time:* ${formData.time}

Reply to confirm or call back.`;

await twilioClient.messages.create({
  from: 'whatsapp:+YOUR_TWILIO_NUMBER',
  to: 'whatsapp:+8801642778552',
  body: message
});
```

## 🎨 Customization Guide

### Changing Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  background: '#050505',  // Change main bg
  emerald: {
    DEFAULT: '#10b981',   // Change accent
  }
}
```

### Adding New Services
Edit `SERVICES` array in `App.tsx`:
```typescript
{
  id: "new-service",
  title: "New Service Name",
  icon: YourIcon,
  description: "Description...",
  price: "৳X,XXX",
  duration: "XX min",
  steps: ["Step 1", "Step 2"],
  beforeAfter: true
}
```

### Updating Doctor Info
Edit `CLINIC_INFO` object in `App.tsx`.

## 📸 Image Requirements

For best results, use these exact images:
1. **Doctor Photo**: Professional headshot, 4:5 ratio, min 800px wide
2. **Clinic Interior**: Wide shot showing dental chair, 16:9 ratio
3. **Before/After**: Split images showing scaling results
4. **X-Ray**: Digital dental X-ray display
5. **RCT**: Root canal treatment process photo

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel --prod
```

### Netlify
```bash
npm run build
# Drag 'build' folder to Netlify
```

### cPanel (Bangladesh hosting)
```bash
npm run build
# Upload 'build' folder contents to public_html
```

## 📞 Support

For technical issues with this template, contact your developer.
For dental appointments: **01642-778552**

---

**Dr. Rakib's Dental Care** | BMDC Reg. No-9910  
S.A. Complex (2nd Floor), Rahattarpol, Chattogram 4000  
Premium Dental Care Since 2014
