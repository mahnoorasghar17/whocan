'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── mock data ─────────────────────────────────────── */
const FAVOR = {
  id: '1',
  title: 'I will deep clean your home',
  categories: ['Home cleaning', 'Gardening', 'Dusting'],
  images: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&h=560&fit=crop&auto=format&q=75',
    'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=440&h=270&fit=crop&auto=format&q=75',
    'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=440&h=270&fit=crop&auto=format&q=75',
  ],
  seller: {
    id: '1',
    name: 'Alfonzo Schuessler',
    badge: 'Pro' as const,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=80',
    rating: 4.8,
    reviews: 8890,
    distance: 8,
    completedJobs: 1200,
    location: '12 High Street Downtown, TX',
    responseTime: 'within a day',
  },
  stats: { rating: 4.5, reviews: 5235, delivery: '1–2 days', revisions: '2 free' },
  description: `I provide professional home cleaning services with over 5 years of experience. I use eco-friendly products and guarantee a spotless result every time.\n\nWhether you need a one-time deep clean before guests arrive or regular weekly maintenance, I'll make your home shine. All supplies are included and I'm fully insured for your peace of mind.`,
  plans: [
    {
      id: 'basic', name: 'Basic', price: 200,
      subtitle: 'Perfect for a single-room or studio clean',
      includes: [
        'Professional deep cleaning of selected area using standard supplies',
        'Dusting and wiping of all accessible surfaces, furniture, and fixtures',
        'Trash collection and proper disposal after service completion',
      ],
    },
    {
      id: 'premium', name: 'Premium', price: 350,
      subtitle: 'Full home deep clean — every room, every surface',
      includes: [
        'Full home deep cleaning of all rooms and surfaces',
        'Professional grade eco-friendly cleaning supplies included',
        'Inside oven, fridge, and all appliances',
        'Window interior cleaning and blinds dusting',
        'Priority scheduling within 24 hours',
      ],
    },
  ],
  addons: [
    { id: 'stain',    label: 'Stain removal for carpets, sofas, or mattresses', price: 15 },
    { id: 'sanitize', label: 'Sanitization & disinfection for kitchens and bathrooms', price: 30 },
    { id: 'windows',  label: 'Window exterior cleaning', price: 25 },
  ],
  reviews: [
    { id: 1, author: 'Shannon Ireland',  avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format&q=80', rating: 5, date: '12 Dec, 2024', text: 'My place looked fresh and spotless after the service. Best cleaner in the decade!' },
    { id: 2, author: 'Mary Katherine',   avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&auto=format&q=80', rating: 5, date: '8 Dec, 2024',  text: 'Quick, professional, and left my place spotless — highly recommended!' },
    { id: 3, author: 'James Wilson',     avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format&q=80', rating: 4, date: '2 Dec, 2024',  text: 'Great service, very thorough and on time. Will book again for sure.' },
    { id: 4, author: 'Sarah Mitchell',   avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&auto=format&q=80', rating: 5, date: '28 Nov, 2024', text: 'Absolutely phenomenal work. My bathroom has never looked this clean.' },
  ],
};

const MORE_FROM_PRO = [
  { id: '2', image: 'https://images.unsplash.com/photo-1509390144018-eefc5d47764f?w=300&h=200&fit=crop&auto=format&q=75', title: 'I will fix your electric supply issue', rating: 4.8, reviews: 5593, price: 135 },
  { id: '3', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop&auto=format&q=75', title: 'I will landscape your garden beautifully', rating: 4.9, reviews: 1140, price: 120 },
  { id: '4', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop&auto=format&q=75', title: 'I will fix all your plumbing issues', rating: 4.7, reviews: 892,  price: 150 },
];

const SIMILAR = [
  { id: '5', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&h=320&fit=crop&auto=format&q=75', title: 'Deep apartment cleaning service',   seller: 'The Bright Services', sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=60&h=60&fit=crop&auto=format&q=80', badge: 'Team', rating: 4.8, reviews: '6,520', price: 200 },
  { id: '6', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=320&fit=crop&auto=format&q=75', title: 'Premium move-in / out cleaning',    seller: 'Kyle Stanford',       sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&auto=format&q=80', badge: 'Pro',  rating: 4.9, reviews: '3,201', price: 280 },
  { id: '7', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500&h=320&fit=crop&auto=format&q=75', title: 'Office & commercial deep clean',    seller: 'Maria Santos',        sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format&q=80', badge: 'Team', rating: 4.7, reviews: '1,876', price: 320 },
  { id: '8', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=320&fit=crop&auto=format&q=75', title: 'Eco-friendly green cleaning service', seller: 'Sophie Lee',         sellerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&auto=format&q=80', badge: 'Pro',  rating: 4.6, reviews: '2,109', price: 175 },
];

/* ─── helpers ───────────────────────────────────────── */
const GRAD = 'linear-gradient(135deg,#BF75FF 0%,#A54AFF 50%,#8430E0 100%)';
const P    = (s: object): React.CSSProperties => s as React.CSSProperties;

function Stars({ n, size = 14 }: { n: number; size?: number }) {
  return (
    <span style={{ display: 'inline-flex', gap: '2px' }}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} width={size} height={size} viewBox="0 0 24 24">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"
            fill={i <= n ? '#F79009' : '#EAECF0'} stroke="none" />
        </svg>
      ))}
    </span>
  );
}

function Badge({ b }: { b: string }) {
  return (
    <span style={{ background: b === 'Pro' ? GRAD : 'linear-gradient(135deg,#34D399,#079455)', borderRadius: '9999px', padding: '3px 10px', fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: 700, color: '#fff', letterSpacing: '0.03em' }}>
      {b}
    </span>
  );
}

function Divider() {
  return <div style={{ height: '1px', background: '#EAECF0', margin: '32px 0' }} />;
}

/* ─── page ───────────────────────────────────────────── */
export default function FavorDetailPage() {
  const router = useRouter();
  const [activeImg,   setActiveImg]   = useState(0);
  const [planId,      setPlanId]      = useState<string>('basic');
  const [addons,      setAddons]      = useState<Set<string>>(new Set());
  const [liked,       setLiked]       = useState(false);
  const [showAll,     setShowAll]     = useState(false);
  const [msgOpen,     setMsgOpen]     = useState(false);
  const [msgText,     setMsgText]     = useState('');

  const plan    = FAVOR.plans.find(p => p.id === planId)!;
  const addonTotal = FAVOR.addons.filter(a => addons.has(a.id)).reduce((s, a) => s + a.price, 0);
  const total   = plan.price + addonTotal;

  const toggleAddon = (id: string) =>
    setAddons(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const reviews = showAll ? FAVOR.reviews : FAVOR.reviews.slice(0, 2);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#FAFAFA', paddingTop: '88px' }}>
        <div style={{ maxWidth: '1376px', margin: '0 auto', padding: '0 32px' }}>

          {/* Breadcrumb */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '20px 0', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>
            <button onClick={() => router.push('/')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667085', fontFamily: 'Poppins,sans-serif', fontSize: '13px', padding: 0 }}>Home</button>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#D0D5DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <button onClick={() => router.push('/explore')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#667085', fontFamily: 'Poppins,sans-serif', fontSize: '13px', padding: 0 }}>Explore</button>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#D0D5DD" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <span style={{ color: '#101828', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '300px' }}>{FAVOR.title}</span>
          </nav>

          {/* ── Image gallery ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 352px', gap: '16px', marginBottom: '40px' }}>
            {/* Main image */}
            <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '520px', cursor: 'pointer', background: '#F3E8FF' }}>
              <img src={FAVOR.images[activeImg]} alt={FAVOR.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.02)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }} />
              {/* Like + Share */}
              <div style={{ position: 'absolute', top: '16px', right: '16px', display: 'flex', gap: '8px' }}>
                <button onClick={() => setLiked(l => !l)}
                  style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      stroke={liked ? '#F43F5E' : '#667085'} strokeWidth="2" fill={liked ? '#F43F5E' : 'none'} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                <button style={{ width: '40px', height: '40px', borderRadius: '9999px', background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 12px rgba(0,0,0,0.12)' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="18" cy="5" r="3" stroke="#667085" strokeWidth="2"/><circle cx="6" cy="12" r="3" stroke="#667085" strokeWidth="2"/><circle cx="18" cy="19" r="3" stroke="#667085" strokeWidth="2"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" stroke="#667085" strokeWidth="2"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" stroke="#667085" strokeWidth="2"/></svg>
                </button>
              </div>
              {/* Photo counter pill */}
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', borderRadius: '9999px', padding: '4px 12px', fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#fff', fontWeight: 500 }}>
                {activeImg + 1} / {FAVOR.images.length}
              </div>
            </div>
            {/* Right thumbnails + nav */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {FAVOR.images.map((img, i) => (
                <div key={i} onClick={() => setActiveImg(i)}
                  style={{ flex: 1, borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', border: `2.5px solid ${activeImg === i ? '#A54AFF' : 'transparent'}`, boxShadow: activeImg === i ? '0 0 0 3px rgba(165,74,255,0.2)' : 'none', transition: 'all 0.15s', background: '#F3E8FF' }}>
                  <img src={img} alt={`View ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: activeImg === i ? 1 : 0.75, transition: 'opacity 0.15s' }} />
                </div>
              ))}
            </div>
          </div>

          {/* ── Two-column body ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '40px', alignItems: 'flex-start', paddingBottom: '80px' }}>

            {/* ── LEFT column ── */}
            <div>
              {/* Title + categories */}
              <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '32px', color: '#101828', lineHeight: '1.2', letterSpacing: '-0.02em', marginBottom: '14px' }}>{FAVOR.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '20px' }}>
                <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085', fontWeight: 500 }}>Sub-category:</span>
                {FAVOR.categories.map(c => (
                  <span key={c} style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 500, color: '#A54AFF', background: '#F4EBFF', border: '1px solid #DFBAFF', borderRadius: '9999px', padding: '3px 12px' }}>{c}</span>
                ))}
              </div>

              {/* Seller strip */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 20px', background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '16px', cursor: 'pointer', transition: 'border-color 0.15s', marginBottom: '0' }}
                onClick={() => router.push(`/seller/${FAVOR.seller.id}`)}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(165,74,255,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#EAECF0'; }}>
                <img src={FAVOR.seller.avatar} alt={FAVOR.seller.name} style={{ width: '52px', height: '52px', borderRadius: '9999px', objectFit: 'cover', border: '2px solid #DFBAFF', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px' }}>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#101828' }}>{FAVOR.seller.name}</span>
                    <Badge b={FAVOR.seller.badge} />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#F79009', fontWeight: 600 }}>
                      <svg viewBox="0 0 24 24" width="14" height="14"><polygon fill="#F79009" stroke="none" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                      {FAVOR.seller.rating}
                    </span>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085' }}>{FAVOR.seller.reviews.toLocaleString()} reviews</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#98A2B3" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#98A2B3" strokeWidth="2"/></svg>
                      {FAVOR.seller.distance} miles away
                    </span>
                  </div>
                </div>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ color: '#98A2B3', flexShrink: 0 }}><path d="M9 18l6-6-6-6" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>

              <Divider />

              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '0' }}>
                {[
                  { label: 'Rating', value: `${FAVOR.stats.rating} ★`, icon: <svg width="18" height="18" viewBox="0 0 24 24"><polygon fill="#F79009" stroke="none" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg> },
                  { label: 'Reviews', value: FAVOR.stats.reviews.toLocaleString(), icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                  { label: 'Delivery', value: FAVOR.stats.delivery, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#A54AFF" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round"/></svg> },
                  { label: 'Revisions', value: FAVOR.stats.revisions, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M23 4v6h-6" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M1 20v-6h6" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                ].map(s => (
                  <div key={s.label} style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '16px', padding: '16px', textAlign: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>{s.icon}</div>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px', color: '#101828', marginBottom: '2px' }}>{s.value}</p>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              <Divider />

              {/* Description */}
              <div style={{ marginBottom: '0' }}>
                <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828', marginBottom: '14px' }}>About this service</h2>
                {FAVOR.description.split('\n\n').map((p, i) => (
                  <p key={i} style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#475467', lineHeight: '1.75', marginBottom: '14px' }}>{p}</p>
                ))}
              </div>

              <Divider />

              {/* Plans */}
              <div style={{ marginBottom: '0' }}>
                <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828', marginBottom: '20px' }}>Plans & Pricing</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '16px' }}>
                  {FAVOR.plans.map(p => {
                    const active = planId === p.id;
                    return (
                      <div key={p.id} onClick={() => setPlanId(p.id)}
                        style={{ background: '#fff', border: `2px solid ${active ? '#A54AFF' : '#EAECF0'}`, borderRadius: '20px', padding: '24px', cursor: 'pointer', transition: 'all 0.15s', boxShadow: active ? '0 0 0 4px rgba(165,74,255,0.1)' : 'none' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                          <div>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px', color: active ? '#A54AFF' : '#101828', marginBottom: '4px' }}>{p.name}</p>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085' }}>{p.subtitle}</p>
                          </div>
                          <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '24px', background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', flexShrink: 0 }}>${p.price}</p>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '14px', paddingTop: '14px', borderTop: '1px solid #EAECF0' }}>
                          {p.includes.map((item, i) => (
                            <div key={i} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                              <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: active ? 'linear-gradient(135deg,#BF75FF,#A54AFF)' : '#F2F4F7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '1px' }}>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke={active ? '#fff' : '#667085'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                              </div>
                              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#475467', lineHeight: '1.5' }}>{item}</p>
                            </div>
                          ))}
                        </div>
                        {active && (
                          <div style={{ marginTop: '14px', background: '#F4EBFF', borderRadius: '9999px', padding: '6px 14px', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#A54AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: 600, color: '#A54AFF' }}>Selected</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <Divider />

              {/* Add-ons */}
              <div style={{ marginBottom: '0' }}>
                <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828', marginBottom: '16px' }}>Add-ons</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {FAVOR.addons.map(a => {
                    const on = addons.has(a.id);
                    return (
                      <div key={a.id} onClick={() => toggleAddon(a.id)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px', background: '#fff', border: `1.5px solid ${on ? '#A54AFF' : '#EAECF0'}`, borderRadius: '16px', cursor: 'pointer', transition: 'all 0.15s', gap: '16px', boxShadow: on ? '0 0 0 3px rgba(165,74,255,0.1)' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1 }}>
                          <div style={{ width: '22px', height: '22px', borderRadius: '6px', border: `2px solid ${on ? '#A54AFF' : '#D0D5DD'}`, background: on ? '#A54AFF' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                            {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#344054', fontWeight: on ? 600 : 400 }}>{a.label}</p>
                        </div>
                        <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#A54AFF', flexShrink: 0 }}>+${a.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Divider />

              {/* Reviews */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828', marginBottom: '6px' }}>Reviews &amp; Ratings</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <Stars n={Math.round(FAVOR.stats.rating)} size={16} />
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#101828' }}>{FAVOR.stats.rating}</span>
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>({FAVOR.stats.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                  <button onClick={() => setShowAll(s => !s)}
                    style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    {showAll ? 'Show less' : 'See all'}
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  {reviews.map(r => (
                    <div key={r.id} style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '16px', padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <img src={r.avatar} alt={r.author} style={{ width: '40px', height: '40px', borderRadius: '9999px', objectFit: 'cover', border: '2px solid #DFBAFF' }} />
                        <div>
                          <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#101828' }}>{r.author}</p>
                          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#98A2B3' }}>{r.date}</p>
                        </div>
                        <div style={{ marginLeft: 'auto' }}><Stars n={r.rating} size={13} /></div>
                      </div>
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#475467', lineHeight: '1.6' }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* More from this pro */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828' }}>More from this pro</h2>
                  <button onClick={() => router.push(`/seller/${FAVOR.seller.id}`)}
                    style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    See all
                  </button>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px' }}>
                  {MORE_FROM_PRO.map(f => (
                    <div key={f.id} onClick={() => router.push(`/favor/${f.id}`)}
                      style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.3)'; el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.1)'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#EAECF0'; el.style.boxShadow = 'none'; }}>
                      <div style={{ height: '140px', overflow: 'hidden' }}>
                        <img src={f.image} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ padding: '12px 14px 14px' }}>
                        <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828', lineHeight: '1.4', marginBottom: '8px' }}>{f.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Stars n={Math.round(f.rating)} size={11} />
                            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#667085' }}>({f.reviews.toLocaleString()})</span>
                          </div>
                          <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '16px', background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>from ${f.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT sticky sidebar ── */}
            <div style={{ position: 'sticky', top: '108px', alignSelf: 'flex-start' }}>
              <div style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(16,24,40,0.08)' }}>
                {/* Price header */}
                <div style={{ padding: '24px 24px 20px', borderBottom: '1px solid #EAECF0' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '36px', background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: 1 }}>${total}</p>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>starting price</p>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#98A2B3" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round"/></svg>
                      {FAVOR.stats.delivery}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M23 4v6h-6M1 20v-6h6M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      {FAVOR.stats.revisions}
                    </span>
                  </div>
                </div>

                {/* Plan picker */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #EAECF0' }}>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#344054', marginBottom: '10px' }}>Select plan</p>
                  <div style={{ display: 'flex', background: '#F2F4F7', borderRadius: '9999px', padding: '4px', gap: '4px' }}>
                    {FAVOR.plans.map(p => (
                      <button key={p.id} onClick={() => setPlanId(p.id)}
                        style={{ flex: 1, fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, padding: '8px 0', borderRadius: '9999px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', ...(planId === p.id ? { background: '#fff', color: '#A54AFF', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' } : { background: 'transparent', color: '#667085' }) }}>
                        {p.name} — ${p.price}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons mini */}
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #EAECF0' }}>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#344054', marginBottom: '10px' }}>Add-ons</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {FAVOR.addons.map(a => {
                      const on = addons.has(a.id);
                      return (
                        <div key={a.id} onClick={() => toggleAddon(a.id)}
                          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', padding: '6px 0' }}>
                          <div style={{ width: '18px', height: '18px', borderRadius: '5px', border: `2px solid ${on ? '#A54AFF' : '#D0D5DD'}`, background: on ? '#A54AFF' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, transition: 'all 0.15s' }}>
                            {on && <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                          </div>
                          <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#344054', flex: 1, lineHeight: '1.4' }}>{a.label}</p>
                          <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 600, color: '#A54AFF', flexShrink: 0 }}>+${a.price}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Price breakdown + CTA */}
                <div style={{ padding: '20px 24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>{plan.name} plan</span>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: '#101828' }}>${plan.price}</span>
                  </div>
                  {FAVOR.addons.filter(a => addons.has(a.id)).map(a => (
                    <div key={a.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>{a.label.split(' ').slice(0, 3).join(' ')}…</span>
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 600, color: '#101828' }}>+${a.price}</span>
                    </div>
                  ))}
                  <div style={{ height: '1px', background: '#EAECF0', margin: '12px 0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#101828' }}>Total</span>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '20px', background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>${total}</span>
                  </div>
                  <button style={{ width: '100%', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#fff', background: GRAD, border: 'none', borderRadius: '9999px', padding: '14px', cursor: 'pointer', marginBottom: '10px', transition: 'opacity 0.2s', boxShadow: '0 4px 16px rgba(165,74,255,0.3)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                    Request Booking
                  </button>
                  <button onClick={() => setMsgOpen(o => !o)}
                    style={{ width: '100%', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '15px', color: '#A54AFF', background: '#fff', border: '1.5px solid #A54AFF', borderRadius: '9999px', padding: '13px', cursor: 'pointer', transition: 'background 0.15s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8F0FF'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}>
                    Send a message
                  </button>
                </div>

                {/* Seller mini card */}
                <div style={{ padding: '0 24px 24px', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }}
                  onClick={() => router.push(`/seller/${FAVOR.seller.id}`)}>
                  <img src={FAVOR.seller.avatar} alt={FAVOR.seller.name} style={{ width: '44px', height: '44px', borderRadius: '9999px', objectFit: 'cover', border: '2px solid #DFBAFF', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828' }}>{FAVOR.seller.name}</p>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#667085' }}>View full profile →</p>
                  </div>
                  <Badge b={FAVOR.seller.badge} />
                </div>
              </div>

              {/* Trust badges */}
              <div style={{ marginTop: '16px', background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '16px', padding: '16px 20px' }}>
                {[
                  { icon: '🔒', label: 'Secure payment protected' },
                  { icon: '✅', label: 'Background-verified seller' },
                  { icon: '↩️', label: 'Satisfaction guarantee' },
                ].map(t => (
                  <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #F2F4F7' }}>
                    <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#F4EBFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', flexShrink: 0 }}>{t.icon}</div>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#344054', fontWeight: 500 }}>{t.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Message drawer */}
          {msgOpen && (
            <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
              onClick={e => { if (e.target === e.currentTarget) setMsgOpen(false); }}>
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setMsgOpen(false)} />
              <div style={{ position: 'relative', background: '#fff', borderRadius: '24px 24px 0 0', padding: '32px', width: '100%', maxWidth: '560px', zIndex: 1 }}>
                <h3 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '18px', color: '#101828', marginBottom: '16px' }}>Message {FAVOR.seller.name}</h3>
                <textarea value={msgText} onChange={e => setMsgText(e.target.value)} placeholder="Hi! I'm interested in your cleaning service..."
                  style={{ width: '100%', height: '120px', border: '1.5px solid #D0D5DD', borderRadius: '12px', padding: '12px 14px', fontFamily: 'Poppins,sans-serif', fontSize: '14px', resize: 'none', outline: 'none', boxSizing: 'border-box' }} />
                <div style={{ display: 'flex', gap: '10px', marginTop: '14px' }}>
                  <button onClick={() => setMsgOpen(false)} style={{ flex: 1, fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: 600, color: '#344054', background: '#F9FAFB', border: '1.5px solid #D0D5DD', borderRadius: '9999px', padding: '12px', cursor: 'pointer' }}>Cancel</button>
                  <button style={{ flex: 2, fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: 700, color: '#fff', background: GRAD, border: 'none', borderRadius: '9999px', padding: '12px', cursor: 'pointer' }}>Send Message</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* ── Similar favors — full width ── */}
        <div style={{ background: '#F9FAFB', borderTop: '1px solid #EAECF0', padding: '64px 0' }}>
          <div style={{ maxWidth: '1376px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 600, color: '#A54AFF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>You may also like</p>
                <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '24px', color: '#101828' }}>Explore similar favors</h2>
              </div>
              <button onClick={() => router.push('/explore/search?q=cleaning')}
                style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', background: '#fff', border: '1.5px solid #A54AFF', borderRadius: '9999px', padding: '10px 24px', cursor: 'pointer', transition: 'background 0.15s' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8F0FF'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}>
                View all
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
              {SIMILAR.map(f => (
                <div key={f.id} onClick={() => router.push(`/favor/${f.id}`)}
                  style={{ background: '#fff', borderRadius: '20px', border: '1.5px solid #EAECF0', cursor: 'pointer', transition: 'all 0.15s', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.3)'; el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.1)'; el.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#EAECF0'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)'; }}>
                  <div style={{ position: 'relative', padding: '10px 10px 0' }}>
                    <div style={{ height: '180px', borderRadius: '14px', overflow: 'hidden' }}>
                      <img src={f.image} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ position: 'absolute', top: '20px', right: '20px', background: f.badge === 'Pro' ? GRAD : 'linear-gradient(135deg,#34D399,#079455)', borderRadius: '9999px', padding: '3px 10px', fontFamily: 'Poppins,sans-serif', fontSize: '10px', fontWeight: 700, color: '#fff' }}>{f.badge}</div>
                  </div>
                  <div style={{ padding: '14px 14px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <img src={f.sellerAvatar} alt={f.seller} style={{ width: '28px', height: '28px', borderRadius: '9999px', objectFit: 'cover', border: '1.5px solid #DFBAFF', flexShrink: 0 }} />
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 600, color: '#344054', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.seller}</p>
                    </div>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#101828', lineHeight: '1.4', flex: 1, marginBottom: '12px' }}>{f.title}</p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px solid #EAECF0' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Stars n={Math.round(f.rating)} size={12} />
                        <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#98A2B3' }}>({f.reviews})</span>
                      </div>
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '18px', background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>${f.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
