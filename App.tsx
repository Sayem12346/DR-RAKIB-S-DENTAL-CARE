import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { 
  Phone, MapPin, Clock, Calendar, ChevronRight, Star, Shield, 
  Award, Users, Stethoscope, Sparkles, Menu, X, ArrowRight,
  CheckCircle2, AlertCircle, Facebook, Instagram, Mail,
  Activity, Heart, Zap, Syringe, Brain, Bone, Smile, Gem
} from 'lucide-react';

// Lazy load the CircularGallery for performance
const CircularGallery = lazy(() => import('./CircularGallery'));

// ==========================================
// DATA & CONFIGURATION
// ==========================================

const CLINIC_INFO = {
  name: "Dr. Rakib's Dental Care",
  doctor: "Dr. Md. Rakibul Hasan",
  qualifications: "BDS (Chittagong Medical College), PGT (Conservative Dentistry)",
  bmdc: "BMDC Reg. No-9910",
  title: "Oral and Dental Surgeon",
  address: "S.A. Complex (2nd Floor), Rahattarpol, south side of Rahattarpol Jame Masjid (below Islami Bank), Chattogram 4000",
  phone: "01642-778552",
  whatsapp: "01642-778552",
  email: "contact@drrakibdental.com",
  hours: {
    morning: "10:00 AM - 1:00 PM",
    evening: "5:00 PM - 10:00 PM",
    friday: "Closed"
  },
  mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.1234567890123!2d91.82345678901234!3d22.35678901234567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDIxJzI0LjQiTiA5McKwNDknMjQuNCJF!5e0!3m2!1sen!2sbd!4v1234567890123!5m2!1sen!2sbd"
};

const SERVICES = [
  {
    id: "scaling",
    title: "Scaling & Polishing",
    icon: Sparkles,
    description: "Professional dental cleaning to remove plaque, tartar, and stains for a brighter, healthier smile.",
    price: "৳800",
    duration: "30-45 min",
    steps: ["Oral examination", "Ultrasonic scaling", "Polishing", "Fluoride treatment"],
    beforeAfter: true
  },
  {
    id: "filling",
    title: "Tooth Filling",
    icon: Shield,
    description: "Restore decayed or damaged teeth with high-quality composite or amalgam fillings.",
    price: "৳500",
    duration: "20-40 min",
    steps: ["Cavity detection", "Decay removal", "Tooth preparation", "Filling placement"],
    beforeAfter: true
  },
  {
    id: "rct",
    title: "Root Canal Treatment",
    icon: Activity,
    description: "Save infected teeth with precision endodontic therapy using advanced rotary instruments.",
    price: "৳3,500",
    duration: "2-3 visits",
    steps: ["X-ray diagnosis", "Pulp removal", "Canal cleaning", "Filling & sealing"],
    beforeAfter: true
  },
  {
    id: "extraction",
    title: "Tooth Extraction",
    icon: Zap,
    description: "Safe and painless removal of damaged, decayed, or problematic teeth.",
    price: "৳500",
    duration: "15-30 min",
    steps: ["Local anesthesia", "Tooth loosening", "Gentle extraction", "Aftercare guidance"],
    beforeAfter: false
  },
  {
    id: "wisdom",
    title: "Wisdom Tooth Removal",
    icon: Brain,
    description: "Surgical extraction of impacted wisdom teeth with minimal discomfort.",
    price: "৳2,500",
    duration: "30-60 min",
    steps: ["3D imaging", "Surgical planning", "Precise removal", "Stitching & recovery"],
    beforeAfter: false
  },
  {
    id: "braces",
    title: "Braces & Orthodontics",
    icon: Smile,
    description: "Straighten teeth and correct bites with metal, ceramic, or invisible aligners.",
    price: "৳15,000",
    duration: "12-24 months",
    steps: ["Consultation", "X-ray & mold", "Bracket placement", "Monthly adjustments"],
    beforeAfter: true
  },
  {
    id: "implant",
    title: "Dental Implants",
    icon: Bone,
    description: "Permanent tooth replacement with titanium implants that look and function naturally.",
    price: "৳25,000",
    duration: "3-6 months",
    steps: ["CBCT scan", "Implant placement", "Healing period", "Crown attachment"],
    beforeAfter: true
  },
  {
    id: "denture",
    title: "Dentures",
    icon: Gem,
    description: "Custom-made removable or fixed dentures for complete or partial tooth loss.",
    price: "৳8,000",
    duration: "2-4 weeks",
    steps: ["Impression taking", "Model creation", "Fit testing", "Final delivery"],
    beforeAfter: true
  },
  {
    id: "crown",
    title: "Crowns & Bridges",
    icon: Crown,
    description: "Restore strength and aesthetics with porcelain, ceramic, or zirconia crowns.",
    price: "৳4,000",
    duration: "2-3 visits",
    steps: ["Tooth shaping", "Impression", "Temporary crown", "Permanent fitting"],
    beforeAfter: true
  },
  {
    id: "whitening",
    title: "Teeth Whitening",
    icon: Star,
    description: "Professional bleaching for a dramatically whiter smile in a single session.",
    price: "৳3,000",
    duration: "60 min",
    steps: ["Shade assessment", "Gum protection", "Whitening gel", "LED activation"],
    beforeAfter: true
  },
  {
    id: "emergency",
    title: "Emergency Dental Care",
    icon: AlertCircle,
    description: "Immediate treatment for dental trauma, severe pain, or acute infections.",
    price: "৳500",
    duration: "Immediate",
    steps: ["Rapid assessment", "Pain management", "Emergency treatment", "Follow-up plan"],
    beforeAfter: false
  }
];

const TESTIMONIALS = [
  { name: "Amina Rahman", text: "Best dental experience in Chattogram! Dr. Rakib is incredibly gentle and professional.", rating: 5 },
  { name: "Tariq Hossain", text: "Got my root canal done here. Painless procedure and excellent follow-up care.", rating: 5 },
  { name: "Fatima Begum", text: "My kids actually enjoy coming here. The clinic is clean and the staff is very friendly.", rating: 5 },
  { name: "Kamal Uddin", text: "Scaling and polishing results were amazing. Teeth feel so clean! Highly recommended.", rating: 5 },
  { name: "Nusrat Jahan", text: "Finally found a dentist I trust. The braces treatment is going perfectly.", rating: 5 }
];

const NOTICES = [
  { id: 1, text: "Eid-ul-Adha Holiday Notice: Clinic will be closed from June 15-20, 2026. Emergency contact available.", date: "2026-06-01", pinned: true },
  { id: 2, text: "New Service: Advanced teeth whitening now available with 20% discount for first 50 patients!", date: "2026-05-28", pinned: false },
  { id: 3, text: "Free dental checkup camp on June 25, 2026 at Rahattarpol Community Center.", date: "2026-05-20", pinned: false }
];

const BLOG_POSTS = [
  { id: 1, title: "5 Signs You Need a Root Canal", excerpt: "Don't ignore these warning signs that could save your tooth...", date: "2026-05-15", readTime: "4 min" },
  { id: 2, title: "Oral Hygiene Tips for Ramadan", excerpt: "Maintain fresh breath and healthy teeth during fasting...", date: "2026-05-10", readTime: "3 min" },
  { id: 3, title: "Why Scaling is Essential", excerpt: "Regular professional cleaning prevents gum disease and tooth loss...", date: "2026-05-05", readTime: "5 min" }
];

// ==========================================
// UTILITY COMPONENTS
// ==========================================

const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let startTime = null;
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const SpotlightCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        '--mouse-x': `${mousePos.x}px`,
        '--mouse-y': `${mousePos.y}px`
      }}
    >
      <div 
        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(16, 185, 129, 0.15), transparent 40%)`
        }}
      />
      {children}
    </div>
  );
};

const ShimmerBorder = ({ children, className = "" }) => {
  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
        <div className="shimmer-border absolute inset-[-1px] rounded-3xl" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

const ScrollReveal = ({ children, delay = 0, className = "" }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTimeout(() => setIsVisible(true), delay);
      }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${className}`}
      style={{
        transform: isVisible ? 'translateY(0) opacity(1)' : 'translateY(40px)',
        opacity: isVisible ? 1 : 0,
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      {children}
    </div>
  );
};

// ==========================================
// SECTION COMPONENTS
// ==========================================

const Navbar = ({ onNavigate, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: "HOME", id: "home" },
    { label: "SERVICES", id: "services" },
    { label: "ABOUT", id: "about" },
    { label: "PRICING", id: "pricing" },
    { label: "BLOG", id: "blog" },
    { label: "CONTACT", id: "contact" }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => onNavigate('home')}
        >
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center group-hover:rotate-[360deg] transition-transform duration-700">
            <Stethoscope className="w-5 h-5 text-[#050505]" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-white font-serif text-lg tracking-tight">DR. RAKIB'S</h1>
            <p className="text-[10px] text-emerald-400 tracking-[0.2em] uppercase font-mono">Dental Care</p>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-xs tracking-[0.15em] uppercase font-mono relative group transition-colors ${activeSection === link.id ? 'text-emerald-400' : 'text-white/60 hover:text-white'}`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-emerald-400 group-hover:w-full transition-all duration-300" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('appointment')}
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-emerald-500 text-[#050505] rounded-full text-xs font-bold tracking-wide hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-shadow duration-300"
          >
            <Calendar className="w-3.5 h-3.5" />
            BOOK NOW
          </button>
          <button 
            className="md:hidden text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#050505]/95 backdrop-blur-xl border-t border-white/10 px-6 py-6 space-y-4">
          {navLinks.map(link => (
            <button
              key={link.id}
              onClick={() => { onNavigate(link.id); setMobileOpen(false); }}
              className="block w-full text-left text-sm tracking-widest uppercase text-white/70 hover:text-emerald-400 py-2"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

const HeroSection = ({ onNavigate }) => {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-[#050505]">
      {/* Background Glows */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-emerald-500/10 rounded-[40%_60%_60%_40%/70%_30%_70%_30%] blur-[100px] animate-morph pointer-events-none" />
      <div className="fixed bottom-20 right-20 w-96 h-96 bg-emerald-500/5 rounded-[60%_40%_40%_60%/30%_70%_30%_70%] blur-[100px] animate-morph pointer-events-none" style={{ animationDelay: '4s' }} />

      <div className="max-w-7xl mx-auto px-6 py-32 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-emerald-400">Premium Dental Care in Chattogram</span>
          </div>

          <h1 className="font-serif text-6xl md:text-7xl lg:text-[100px] leading-[0.9] tracking-tighter text-white">
            Your Smile,<br />
            Our <em className="text-emerald-400 not-italic">Passion</em>
          </h1>

          <p className="text-white/50 text-lg max-w-md font-light leading-relaxed">
            Experience world-class dental care with Dr. Md. Rakibul Hasan. 
            Advanced treatments, compassionate care, and stunning results.
          </p>

          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onNavigate('appointment')}
              className="px-8 py-4 bg-white text-[#050505] rounded-full font-bold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 flex items-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Appointment
            </button>
            <button 
              onClick={() => onNavigate('services')}
              className="px-8 py-4 border border-white/30 text-white rounded-full font-bold text-sm tracking-wide hover:border-emerald-400 hover:text-emerald-400 transition-all duration-300 flex items-center gap-2"
            >
              Our Services
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-8 pt-4">
            <div>
              <div className="text-3xl font-serif text-white"><AnimatedCounter end={5000} suffix="+" /></div>
              <div className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mt-1">Happy Patients</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="text-3xl font-serif text-white"><AnimatedCounter end={12} suffix="+" /></div>
              <div className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mt-1">Years Experience</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="text-3xl font-serif text-white">4.9</div>
              <div className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mt-1">Google Rating</div>
            </div>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative w-full aspect-square max-w-lg mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-[40px] blur-2xl" />
            <div className="relative bg-white/5 backdrop-blur-xl rounded-[40px] border border-white/10 p-8 h-full flex flex-col items-center justify-center">
              <Suspense fallback={<div className="text-white/50">Loading Gallery...</div>}>
                <CircularGallery 
                  items={[
                    { image: '/mnt/agents/upload/1000089776.jpg', text: 'Modern Clinic' },
                    { image: '/mnt/agents/upload/1000089784.jpg', text: 'Dr. Rakib' },
                    { image: '/mnt/agents/upload/1000089786.jpg', text: 'Scaling Result' },
                    { image: '/mnt/agents/upload/1000089785.jpg', text: 'Digital X-Ray' },
                    { image: '/mnt/agents/upload/1000089777.png', text: 'RCT Treatment' },
                    { image: '/mnt/agents/upload/1000089776.jpg', text: 'State-of-art' }
                  ]}
                  bend={3}
                  textColor="#10b981"
                  borderRadius={0.08}
                  scrollEase={0.03}
                  scrollSpeed={2}
                  font="bold 24px 'Newsreader'"
                />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ServicesSection = ({ onNavigate }) => {
  return (
    <section id="services" className="py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-emerald-400">What We Offer</span>
            <h2 className="font-serif text-5xl md:text-6xl text-white mt-4 tracking-tight">Our Services</h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">Comprehensive dental solutions tailored to your needs with cutting-edge technology.</p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 100}>
              <SpotlightCard className="h-full">
                <ShimmerBorder className="h-full">
                  <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-10 h-full group hover:bg-white/[0.04] transition-colors duration-500">
                    <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                      <service.icon className="w-6 h-6 text-emerald-400" />
                    </div>
                    <h3 className="font-serif text-2xl text-white mb-3">{service.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed mb-6">{service.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-400 font-mono text-sm">{service.price}</span>
                      <button 
                        onClick={() => onNavigate(`service-${service.id}`)}
                        className="flex items-center gap-2 text-white/60 hover:text-emerald-400 text-sm transition-colors"
                      >
                        Details <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </ShimmerBorder>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section id="about" className="py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal>
            <div className="relative">
              <div className="absolute -inset-4 bg-emerald-500/10 rounded-[40px] blur-xl" />
              <div className="relative rounded-[40px] overflow-hidden border border-white/10">
                <img 
                  src="/mnt/agents/upload/1000089784.jpg" 
                  alt="Dr. Md. Rakibul Hasan"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#050505] to-transparent p-8">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 text-sm font-mono tracking-wider">BMDC REG. 9910</span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-8">
            <ScrollReveal>
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-emerald-400">About The Doctor</span>
              <h2 className="font-serif text-5xl md:text-6xl text-white mt-4 tracking-tight">Dr. Md. Rakibul Hasan</h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <div className="space-y-4 text-white/60 leading-relaxed">
                <p className="text-lg text-white/80">
                  {CLINIC_INFO.qualifications}
                </p>
                <p>
                  A dedicated Oral and Dental Surgeon with extensive training from Chittagong Medical College 
                  and Hospital. Specializing in conservative dentistry and advanced restorative procedures.
                </p>
                <p>
                  With over 5,000 successful treatments and a commitment to painless, patient-centered care, 
                  Dr. Rakib has established Rakib's Dental Care as Chattogram's premier destination for 
                  comprehensive dental health.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl p-6">
                  <Stethoscope className="w-6 h-6 text-emerald-400 mb-3" />
                  <div className="text-2xl font-serif text-white">12+</div>
                  <div className="text-[10px] tracking-wider uppercase font-mono text-white/40 mt-1">Years Experience</div>
                </div>
                <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl p-6">
                  <Users className="w-6 h-6 text-emerald-400 mb-3" />
                  <div className="text-2xl font-serif text-white">5000+</div>
                  <div className="text-[10px] tracking-wider uppercase font-mono text-white/40 mt-1">Patients Treated</div>
                </div>
                <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl p-6">
                  <Shield className="w-6 h-6 text-emerald-400 mb-3" />
                  <div className="text-2xl font-serif text-white">100%</div>
                  <div className="text-[10px] tracking-wider uppercase font-mono text-white/40 mt-1">Sterilization</div>
                </div>
                <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-2xl p-6">
                  <Star className="w-6 h-6 text-emerald-400 mb-3" />
                  <div className="text-2xl font-serif text-white">4.9</div>
                  <div className="text-[10px] tracking-wider uppercase font-mono text-white/40 mt-1">Google Rating</div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const PricingSection = () => {
  return (
    <section id="pricing" className="py-32 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-emerald-400">Transparent Pricing</span>
            <h2 className="font-serif text-5xl md:text-6xl text-white mt-4 tracking-tight">Treatment Costs</h2>
            <p className="text-white/40 mt-4">Starting from prices. Final cost depends on diagnosis and complexity.</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden">
            <div className="grid grid-cols-12 gap-4 p-6 border-b border-white/5 text-[10px] tracking-[0.2em] uppercase font-mono text-white/40">
              <div className="col-span-6">Service</div>
              <div className="col-span-3 text-right">Duration</div>
              <div className="col-span-3 text-right">Starting From</div>
            </div>
            {SERVICES.map((service, i) => (
              <div 
                key={service.id}
                className={`grid grid-cols-12 gap-4 p-6 items-center hover:bg-white/[0.02] transition-colors ${i !== SERVICES.length - 1 ? 'border-b border-white/5' : ''}`}
              >
                <div className="col-span-6 flex items-center gap-3">
                  <service.icon className="w-4 h-4 text-emerald-400" />
                  <span className="text-white font-medium">{service.title}</span>
                </div>
                <div className="col-span-3 text-right text-white/50 text-sm">{service.duration}</div>
                <div className="col-span-3 text-right text-emerald-400 font-mono font-bold">{service.price}</div>
              </div>
            ))}
          </div>
          <p className="text-white/30 text-sm mt-6 text-center italic">
            * Prices are indicative and may vary based on case complexity. Consultation required for exact quotation.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-20">
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-emerald-400">Testimonials</span>
            <h2 className="font-serif text-5xl md:text-6xl text-white mt-4 tracking-tight">Patient Stories</h2>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={i} delay={i * 150}>
              <SpotlightCard className="h-full">
                <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-3xl p-8 h-full">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                    ))}
                  </div>
                  <p className="text-white/70 leading-relaxed mb-6 italic font-serif text-lg">"{t.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                      <span className="text-emerald-400 font-bold text-sm">{t.name[0]}</span>
                    </div>
                    <div>
                      <div className="text-white text-sm font-medium">{t.name}</div>
                      <div className="text-white/40 text-xs">Verified Patient</div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const NoticeSection = () => {
  return (
    <section className="py-20 bg-[#050505]">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <AlertCircle className="w-5 h-5 text-emerald-400" />
            <h2 className="font-serif text-3xl text-white tracking-tight">Notice Center</h2>
          </div>
        </ScrollReveal>

        <div className="space-y-4">
          {NOTICES.map((notice, i) => (
            <ScrollReveal key={notice.id} delay={i * 100}>
              <div className={`bg-white/[0.02] backdrop-blur border ${notice.pinned ? 'border-emerald-500/30' : 'border-white/10'} rounded-2xl p-6 flex items-start gap-4`}>
                <div className={`w-2 h-2 rounded-full mt-2 ${notice.pinned ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'}`} />
                <div className="flex-1">
                  <p className="text-white/80 leading-relaxed">{notice.text}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <span className="text-[10px] tracking-wider uppercase font-mono text-white/40">{notice.date}</span>
                    {notice.pinned && (
                      <span className="text-[10px] tracking-wider uppercase font-mono text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">Pinned</span>
                    )}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const BlogSection = ({ onNavigate }) => {
  return (
    <section id="blog" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-emerald-400">Dental Awareness</span>
              <h2 className="font-serif text-5xl text-white mt-4 tracking-tight">From Our Blog</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-emerald-400 text-sm hover:underline">
              View All <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => (
            <ScrollReveal key={post.id} delay={i * 150}>
              <div className="group cursor-pointer" onClick={() => onNavigate(`blog-${post.id}`)}>
                <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-3xl overflow-hidden hover:border-emerald-500/30 transition-colors duration-500">
                  <div className="h-48 bg-gradient-to-br from-emerald-500/10 to-transparent flex items-center justify-center">
                    <Heart className="w-12 h-12 text-emerald-500/20 group-hover:text-emerald-400 transition-colors duration-500" />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-[10px] tracking-wider uppercase font-mono text-white/40">{post.date}</span>
                      <span className="text-[10px] tracking-wider uppercase font-mono text-emerald-400">{post.readTime} read</span>
                    </div>
                    <h3 className="font-serif text-xl text-white group-hover:text-emerald-400 transition-colors mb-3">{post.title}</h3>
                    <p className="text-white/40 text-sm">{post.excerpt}</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const AppointmentSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send to backend
    console.log('Appointment:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section id="appointment" className="py-32 bg-[#050505] relative">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-emerald-400">Book Your Visit</span>
            <h2 className="font-serif text-5xl md:text-6xl text-white mt-4 tracking-tight">Appointment</h2>
            <p className="text-white/40 mt-4">Schedule your consultation in just a few clicks</p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                <h3 className="font-serif text-2xl text-white mb-2">Appointment Requested!</h3>
                <p className="text-white/60">We will contact you shortly to confirm your booking.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mb-2 block">Full Name</label>
                    <input 
                      type="text"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mb-2 block">Phone Number</label>
                    <input 
                      type="tel"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-emerald-400 focus:outline-none transition-colors"
                      placeholder="01XXXXXXXXX"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mb-2 block">Select Service</label>
                  <select 
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400 focus:outline-none transition-colors appearance-none"
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="" className="bg-[#050505]">Choose a service...</option>
                    {SERVICES.map(s => (
                      <option key={s.id} value={s.id} className="bg-[#050505]">{s.title}</option>
                    ))}
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mb-2 block">Preferred Date</label>
                    <input 
                      type="date"
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400 focus:outline-none transition-colors"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mb-2 block">Preferred Time</label>
                    <select 
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-emerald-400 focus:outline-none transition-colors appearance-none"
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                    >
                      <option value="" className="bg-[#050505]">Select time...</option>
                      <option value="10:00" className="bg-[#050505]">10:00 AM</option>
                      <option value="11:00" className="bg-[#050505]">11:00 AM</option>
                      <option value="12:00" className="bg-[#050505]">12:00 PM</option>
                      <option value="17:00" className="bg-[#050505]">5:00 PM</option>
                      <option value="18:00" className="bg-[#050505]">6:00 PM</option>
                      <option value="19:00" className="bg-[#050505]">7:00 PM</option>
                      <option value="20:00" className="bg-[#050505]">8:00 PM</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mb-2 block">Message (Optional)</label>
                  <textarea 
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:border-emerald-400 focus:outline-none transition-colors resize-none"
                    placeholder="Describe your symptoms or concerns..."
                    value={formData.message}
                    onChange={e => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full py-4 bg-emerald-500 text-[#050505] rounded-full font-bold text-sm tracking-wide hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" />
                  Request Appointment
                </button>

                <p className="text-center text-white/30 text-xs">
                  You can also book via WhatsApp: <a href={`https://wa.me/${CLINIC_INFO.whatsapp}`} className="text-emerald-400 hover:underline">{CLINIC_INFO.whatsapp}</a>
                </p>
              </form>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contact" className="py-32 bg-[#050505]">
      <div className="max-w-7xl mx-auto px-6">
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-emerald-400">Get In Touch</span>
            <h2 className="font-serif text-5xl md:text-6xl text-white mt-4 tracking-tight">Contact Us</h2>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-12">
          <ScrollReveal>
            <div className="space-y-8">
              <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-3xl p-8 flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Address</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{CLINIC_INFO.address}</p>
                </div>
              </div>

              <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-3xl p-8 flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Visiting Hours</h3>
                  <div className="text-white/60 text-sm space-y-1">
                    <p>Morning: {CLINIC_INFO.hours.morning}</p>
                    <p>Evening: {CLINIC_INFO.hours.evening}</p>
                    <p className="text-emerald-400">Friday: {CLINIC_INFO.hours.friday}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-3xl p-8 flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium mb-1">Phone & WhatsApp</h3>
                  <a href={`tel:${CLINIC_INFO.phone}`} className="text-emerald-400 text-lg font-mono hover:underline">{CLINIC_INFO.phone}</a>
                  <p className="text-white/40 text-sm mt-1">Available for emergency calls</p>
                </div>
              </div>

              <div className="flex gap-4">
                <a href={`https://wa.me/${CLINIC_INFO.whatsapp}`} className="flex-1 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4 flex items-center justify-center gap-2 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
                <a href={`tel:${CLINIC_INFO.phone}`} className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-center gap-2 text-white hover:bg-white/10 transition-colors">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-medium">Call Now</span>
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="bg-white/[0.02] backdrop-blur border border-white/10 rounded-3xl overflow-hidden h-full min-h-[400px]">
              <iframe
                src={CLINIC_INFO.mapUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Dr. Rakib's Dental Care Location"
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

const CTASection = ({ onNavigate }) => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-emerald-500/5" />
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal>
          <h2 className="font-serif text-5xl md:text-7xl text-white tracking-tight mb-8">
            Ready for Your<br />
            <span className="bg-gradient-to-r from-white via-emerald-200 to-emerald-400 bg-clip-text text-transparent animate-gradient">
              Perfect Smile?
            </span>
          </h2>
          <p className="text-white/50 text-lg mb-12 max-w-xl mx-auto">
            Book your consultation today and take the first step towards exceptional dental health.
          </p>
          <button 
            onClick={() => onNavigate('appointment')}
            className="px-12 py-5 bg-emerald-500 text-[#050505] rounded-full font-bold text-lg tracking-wide hover:shadow-[0_0_40px_rgba(16,185,129,0.4)] transition-all duration-300 animate-pulse-glow"
          >
            Book Appointment Now
          </button>
        </ScrollReveal>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }) => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-[#050505]" />
              </div>
              <div>
                <h3 className="text-white font-serif text-lg">DR. RAKIB'S</h3>
                <p className="text-[10px] text-emerald-400 tracking-[0.2em] uppercase font-mono">Dental Care</p>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-sm mb-6">
              {CLINIC_INFO.address}
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/60 hover:text-emerald-400 hover:bg-white/10 transition-all">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/60 hover:text-emerald-400 hover:bg-white/10 transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href={`mailto:${CLINIC_INFO.email}`} className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-white/60 hover:text-emerald-400 hover:bg-white/10 transition-all">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {['Home', 'Services', 'About', 'Pricing', 'Blog', 'Contact'].map(link => (
                <li key={link}>
                  <button 
                    onClick={() => onNavigate(link.toLowerCase())}
                    className="text-white/60 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.2em] uppercase font-mono text-white/40 mb-6">Services</h4>
            <ul className="space-y-3">
              {SERVICES.slice(0, 6).map(s => (
                <li key={s.id}>
                  <span className="text-white/60 text-sm">{s.title}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">
            © 2026 Dr. Rakib's Dental Care. All rights reserved. BMDC Reg. No-9910
          </p>
          <p className="text-white/30 text-xs">
            Crafted with precision in Chattogram, Bangladesh
          </p>
        </div>
      </div>
    </footer>
  );
};

// ==========================================
// MAIN APP
// ==========================================

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.3 });

    ['home', 'services', 'about', 'pricing', 'blog', 'contact', 'appointment'].forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-[#EBEBEB] font-sans selection:bg-emerald-500/30">
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .font-serif { font-family: 'Newsreader', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'Space Grotesk', monospace; }

        @keyframes morph {
          0%, 100% { border-radius: 40% 60% 60% 40% / 70% 30% 70% 30%; }
          50% { border-radius: 60% 40% 40% 60% / 30% 70% 30% 70%; }
        }
        .animate-morph { animation: morph 8s ease-in-out infinite; }

        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .shimmer-border {
          background: linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 4s linear infinite;
        }

        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(16, 185, 129, 0.3); }
          50% { box-shadow: 0 0 40px rgba(16, 185, 129, 0.5); }
        }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient-shift 3s ease infinite;
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #10b981; border-radius: 4px; }
      `}</style>

      <Navbar onNavigate={scrollTo} activeSection={activeSection} />

      <main>
        <HeroSection onNavigate={scrollTo} />
        <ServicesSection onNavigate={scrollTo} />
        <AboutSection />
        <PricingSection />
        <TestimonialsSection />
        <NoticeSection />
        <BlogSection onNavigate={scrollTo} />
        <AppointmentSection />
        <ContactSection />
        <CTASection onNavigate={scrollTo} />
      </main>

      <Footer onNavigate={scrollTo} />

      {/* Floating Emergency Button */}
      <a 
        href={`tel:${CLINIC_INFO.phone}`}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:scale-110 transition-transform animate-bounce"
      >
        <Phone className="w-6 h-6 text-[#050505]" />
      </a>
    </div>
  );
}
