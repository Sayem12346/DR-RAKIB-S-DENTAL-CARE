# 🚀 Dr. Rakib's Dental Care - Complete Setup Guide

## 📋 Table of Contents
1. [Project Overview](#overview)
2. [File Structure](#structure)
3. [Installation Steps](#installation)
4. [Image Setup](#images)
5. [Google Reviews Integration](#google-reviews)
6. [Google Maps Setup](#google-maps)
7. [WhatsApp Integration](#whatsapp)
8. [Backend API Structure](#backend)
9. [Deployment](#deployment)
10. [Customization](#customization)

---

## <a name="overview"></a>1. Project Overview

**Tech Stack:**
- React 18 + TypeScript
- Tailwind CSS (Cyber Serif design system)
- OGL (WebGL) for CircularGallery
- Lucide React (icons)

**Design System:**
- Background: #050505 (Deep Black)
- Accent: #10b981 (Emerald)
- Text: #EBEBEB (Soft White)
- Typography: Newsreader (Serif), Inter (Sans), Space Grotesk (Mono)

---

## <a name="structure"></a>2. File Structure

```
dr-rakib-dental/
├── public/
│   ├── index.html              ← SEO meta tags included
│   ├── favicon.ico
│   └── images/                 ← PUT YOUR PHOTOS HERE
│       ├── doctor.jpg          ← Dr. Rakib's professional photo
│       ├── clinic.jpg          ← Clinic interior shot
│       ├── scaling-before.jpg  ← Before scaling
│       ├── scaling-after.jpg   ← After scaling
│       ├── xray.jpg            ← Digital X-ray photo
│       └── rct.jpg             ← Root canal treatment
│
├── src/
│   ├── App.tsx                 ← MAIN WEBSITE (Public)
│   ├── CircularGallery.tsx     ← WebGL 3D Gallery Component
│   ├── AdminApp.tsx            ← ADMIN PANEL (Separate)
│   ├── index.tsx               ← Entry point
│   └── index.css               ← Tailwind + global styles
│
├── tailwind.config.js          ← Tailwind customization
├── postcss.config.js           ← PostCSS setup
├── package.json                ← Dependencies
└── README.md                   ← Full documentation
```

---

## <a name="installation"></a>3. Installation Steps

### Step 1: Create React App
```bash
npx create-react-app dr-rakib-dental --template typescript
cd dr-rakib-dental
```

### Step 2: Install Dependencies
```bash
npm install ogl@^0.0.116 lucide-react@^0.454.0
npm install -D tailwindcss@^3.4.0 autoprefixer@^10.4.16 postcss@^8.4.32
```

### Step 3: Initialize Tailwind
```bash
npx tailwindcss init -p
```

### Step 4: Copy Files
Copy all files from this project into your React app:
- `App.tsx` → `src/App.tsx`
- `CircularGallery.tsx` → `src/CircularGallery.tsx`
- `AdminApp.tsx` → `src/AdminApp.tsx` (optional)
- `index.css` → `src/index.css`
- `index.tsx` → `src/index.tsx`
- `index.html` → `public/index.html`
- `tailwind.config.js` → root
- `postcss.config.js` → root

### Step 5: Add Images
Create `public/images/` folder and add your photos.

### Step 6: Start Development
```bash
npm start
```
Open http://localhost:3000

### Step 7: Build for Production
```bash
npm run build
```

---

## <a name="images"></a>4. Image Setup Guide

### Required Images (Place in public/images/)

| Filename | Description | Dimensions | Source |
|----------|-------------|------------|--------|
| `doctor.jpg` | Dr. Rakib's professional photo | 800x1000 | Your photo |
| `clinic.jpg` | Clinic interior wide shot | 1600x900 | Your photo |
| `scaling-before.jpg` | Dirty teeth before cleaning | 800x600 | Your photo |
| `scaling-after.jpg` | Clean teeth after scaling | 800x600 | Your photo |
| `xray.jpg` | Digital X-ray on monitor | 800x600 | Your photo |
| `rct.jpg` | Root canal procedure | 800x600 | Your photo |

### Using Your Uploaded Images

The CircularGallery in Hero section currently uses placeholder URLs.
To use your actual uploaded images, update the `items` prop in `App.tsx`:

```tsx
<CircularGallery 
  items={[
    { image: '/images/clinic.jpg', text: 'Modern Clinic' },
    { image: '/images/doctor.jpg', text: 'Dr. Rakib' },
    { image: '/images/scaling-after.jpg', text: 'Scaling Result' },
    { image: '/images/xray.jpg', text: 'Digital X-Ray' },
    { image: '/images/rct.jpg', text: 'RCT Treatment' },
    { image: '/images/clinic.jpg', text: 'State-of-art' }
  ]}
/>
```

---

## <a name="google-reviews"></a>5. Google Reviews Integration (3 Methods)

### 🔥 METHOD 1: Elfsight Widget (Easiest - Recommended)

**Step 1:** Go to https://elfsight.com/google-reviews-widget/

**Step 2:** Create free account

**Step 3:** Connect your Google Business Profile:
- Search: "Dr. Rakib's Dental Care"
- Or enter your Google Place ID

**Step 4:** Customize widget:
- Theme: Dark
- Background: #050505
- Text color: #EBEBEB
- Accent: #10b981
- Layout: Grid or Carousel
- Show: 5-6 reviews
- Hide: "Powered by Elfsight" (paid feature, or keep for free)

**Step 5:** Get embed code, it looks like:
```html
<script src="https://apps.elfsight.com/p/platform.js" defer></script>
<div class="elfsight-app-ABC123XYZ"></div>
```

**Step 6:** Add to `public/index.html` in `<head>`:
```html
<script src="https://apps.elfsight.com/p/platform.js" defer></script>
```

**Step 7:** Add widget container in `App.tsx` Testimonials section:
```tsx
<ScrollReveal>
  <div className="mt-12">
    <div className="elfsight-app-ABC123XYZ" />
  </div>
</ScrollReveal>
```

**Cost:** Free plan shows up to 50 reviews with Elfsight branding.
**Paid:** $5/month to remove branding and get more features.

---

### METHOD 2: EmbedSocial (Free Alternative)

**Step 1:** Go to https://embedsocial.com/

**Step 2:** Connect Google Business

**Step 3:** Generate embed code

**Step 4:** Add to website same as Method 1

---

### METHOD 3: Manual Static Badge (Simplest)

Add this to Testimonials section in `App.tsx`:

```tsx
<div className="text-center mt-12">
  <a 
    href="https://www.google.com/search?q=Dr+Rakib+Dental+Care+Chattogram"
    target="_blank" 
    rel="noopener noreferrer"
    className="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-full px-8 py-4 hover:bg-white/10 transition-all group"
  >
    {/* Google G icon SVG */}
    <svg className="w-6 h-6" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
    <div className="text-left">
      <div className="text-white font-medium">Google Reviews</div>
      <div className="flex items-center gap-2">
        <span className="text-emerald-400 font-bold">4.9</span>
        <div className="flex">
          {[1,2,3,4,5].map(i => (
            <Star key={i} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
          ))}
        </div>
        <span className="text-white/40 text-sm">(127 reviews)</span>
      </div>
    </div>
    <ArrowRight className="w-5 h-5 text-white/40 group-hover:text-emerald-400 transition-colors" />
  </a>
</div>
```

**To get real review count:**
1. Go to your Google Business Profile
2. Check review count
3. Update the number in code

---

## <a name="google-maps"></a>6. Google Maps Setup

### Getting Your Exact Map Embed URL

**Step 1:** Go to https://maps.google.com

**Step 2:** Search: `S.A. Complex, Rahattarpol, Chattogram`

**Step 3:** Click on your business (or add if not listed)

**Step 4:** Click "Share" → "Embed a map"

**Step 5:** Copy the iframe code, example:
```html
<iframe 
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d..."
  width="600" 
  height="450" 
  style="border:0;" 
  allowfullscreen="" 
  loading="lazy"
></iframe>
```

**Step 6:** Extract just the `src` URL and update `CLINIC_INFO.mapUrl` in `App.tsx`:

```typescript
const CLINIC_INFO = {
  // ... other info ...
  mapUrl: "YOUR_COPIED_EMBED_URL"
};
```

### Alternative: Using Google Maps API (More Control)

**Step 1:** Get API key from https://console.cloud.google.com/

**Step 2:** Enable "Maps JavaScript API"

**Step 3:** Install React Google Maps:
```bash
npm install @react-google-maps/api
```

**Step 4:** Use in Contact section:
```tsx
import { GoogleMap, Marker } from '@react-google-maps/api';

<GoogleMap
  center={{ lat: 22.3568, lng: 91.8234 }}
  zoom={16}
  mapContainerStyle={{ width: '100%', height: '400px' }}
  options={{
    styles: [{ /* dark theme styles */ }],
    disableDefaultUI: true
  }}
>
  <Marker position={{ lat: 22.3568, lng: 91.8234 }} />
</GoogleMap>
```

---

## <a name="whatsapp"></a>7. WhatsApp Integration

### Current Implementation (Already Working)

The website already has:
- Floating WhatsApp button (bottom-right)
- WhatsApp link in appointment form
- Click-to-WhatsApp from contact section

All use: `https://wa.me/01642778552`

### Advanced: WhatsApp Business API

For automated appointment confirmations:

**Step 1:** Apply at https://business.whatsapp.com/products/business-platform

**Step 2:** Or use Twilio:
```bash
npm install twilio
```

**Step 3:** Backend code:
```javascript
const twilio = require('twilio');
const client = twilio(accountSid, authToken);

// Send appointment confirmation
await client.messages.create({
  from: 'whatsapp:+YOUR_TWILIO_NUMBER',
  to: 'whatsapp:+8801642778552',
  body: `🦷 New Appointment\n\nPatient: ${name}\nService: ${service}\nDate: ${date}\nTime: ${time}`
});
```

---

## <a name="backend"></a>8. Backend API Structure (Node.js/Express)

### Required API Endpoints

```javascript
// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Schema
const Appointment = mongoose.model('Appointment', {
  name: String,
  phone: String,
  service: String,
  date: String,
  time: String,
  message: String,
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Notice = mongoose.model('Notice', {
  text: String,
  image: String,
  date: Date,
  pinned: { type: Boolean, default: false },
  active: { type: Boolean, default: true }
});

// APPOINTMENTS
app.post('/api/appointments', async (req, res) => {
  const appointment = new Appointment(req.body);
  await appointment.save();

  // Send WhatsApp notification
  // sendWhatsAppNotification(appointment);

  res.json({ success: true, id: appointment._id });
});

app.get('/api/appointments', async (req, res) => {
  const { status, date } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (date) filter.date = date;

  const appointments = await Appointment.find(filter).sort({ createdAt: -1 });
  res.json(appointments);
});

app.put('/api/appointments/:id/status', async (req, res) => {
  const { status } = req.body;
  await Appointment.findByIdAndUpdate(req.params.id, { status });
  res.json({ success: true });
});

// NOTICES
app.get('/api/notices', async (req, res) => {
  const notices = await Notice.find({ active: true }).sort({ pinned: -1, date: -1 });
  res.json(notices);
});

app.post('/api/notices', async (req, res) => {
  const notice = new Notice(req.body);
  await notice.save();
  res.json({ success: true, id: notice._id });
});

app.put('/api/notices/:id', async (req, res) => {
  await Notice.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true });
});

app.delete('/api/notices/:id', async (req, res) => {
  await Notice.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// Connect MongoDB and start server
mongoose.connect('mongodb://localhost:27017/dr-rakib-dental');
app.listen(5000, () => console.log('Server running on port 5000'));
```

### Frontend API Integration

Update `App.tsx` to fetch from backend:

```typescript
// In AppointmentSection:
const handleSubmit = async (e) => {
  e.preventDefault();
  const response = await fetch('http://localhost:5000/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  if (response.ok) setSubmitted(true);
};

// In NoticeSection (use useEffect):
useEffect(() => {
  fetch('http://localhost:5000/api/notices')
    .then(r => r.json())
    .then(data => setNotices(data));
}, []);
```

---

## <a name="deployment"></a>9. Deployment Options

### Option A: Vercel (Recommended - Free)
```bash
npm install -g vercel
vercel --prod
```
- Automatic HTTPS
- Global CDN
- Custom domain support

### Option B: Netlify (Free)
```bash
npm run build
# Drag 'build' folder to Netlify drop zone
```

### Option C: Bangladesh Hosting (cPanel)
```bash
npm run build
# Upload 'build' folder contents to public_html via File Manager
```

### Option D: Firebase Hosting
```bash
npm install -g firebase-tools
firebase init hosting
firebase deploy
```

---

## <a name="customization"></a>10. Customization Guide

### Change Primary Color
Edit `tailwind.config.js`:
```javascript
colors: {
  emerald: {
    DEFAULT: '#10b981',  // Change this hex code
  }
}
```
Then find/replace `#10b981` in all files.

### Add New Service
Edit `SERVICES` array in `App.tsx`:
```typescript
{
  id: "pediatric",
  title: "Pediatric Dentistry",
  icon: Baby,
  description: "Gentle dental care for children...",
  price: "৳1,000",
  duration: "30 min",
  steps: ["Child-friendly intro", "Gentle exam", "Treatment", "Reward"],
  beforeAfter: false
}
```

### Update Doctor Information
Edit `CLINIC_INFO` object at top of `App.tsx`.

### Change Fonts
Edit `index.html` Google Fonts link and `tailwind.config.js`.

### SEO Optimization
Already included in `index.html`:
- Meta description
- Keywords
- Open Graph tags
- Structured data (add JSON-LD)

---

## 📞 Support Contacts

**Technical Issues:** Your web developer  
**Dental Appointments:** 01642-778552  
**Clinic Address:** S.A. Complex (2nd Floor), Rahattarpol, Chattogram 4000

---

**Built with ❤️ for Dr. Rakib's Dental Care**
