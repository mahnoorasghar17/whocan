'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

/* ─── mock data ─────────────────────────────────────── */
const SELLER = {
  id: '1',
  isTeam: false,
  name: 'Alfonzo Schuessler',
  badge: 'Pro' as const,
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&auto=format&q=80',
  cover: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&h=300&fit=crop&auto=format&q=60',
  rating: 4.8,
  reviews: 6890,
  distance: 8,
  completedJobs: 1200,
  location: '12 High Street Downtown, TX',
  responseTime: 'within a day',
  about: `I've been delivering professional home cleaning services for over 5 years across the Dallas–Fort Worth area. I take pride in every job — from single-room cleans to full home overhauls — using eco-friendly, pet-safe products.\n\nAll my work is fully insured and I carry my own professional-grade equipment. Flexible scheduling, including evenings and weekends. Repeat customers get a 10% loyalty discount.`,
  specialty: 'Home Cleaning Expert',
  memberSince: 'March 2021',
  languages: ['English', 'Spanish'],
  verifications: ['ID Verified', 'Background Check', 'Insurance Verified'],
  favors: [
    { id: '1', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop&auto=format&q=75', title: 'I will deep clean your home',            rating: 4.8, reviews: 8890, price: 200 },
    { id: '2', image: 'https://images.unsplash.com/photo-1509390144018-eefc5d47764f?w=300&h=200&fit=crop&auto=format&q=75', title: 'I will fix your electric supply issue', rating: 4.8, reviews: 5593, price: 135 },
    { id: '3', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=200&fit=crop&auto=format&q=75', title: 'I will landscape your garden beautifully', rating: 4.9, reviews: 1140, price: 120 },
    { id: '4', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=300&h=200&fit=crop&auto=format&q=75', title: 'I will fix all your plumbing issues',    rating: 4.7, reviews: 892,  price: 150 },
  ],
  reviews: [
    { id: 1, author: 'Shannon Ireland', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&auto=format&q=80', rating: 5, date: '12 Dec, 2024', favor: 'I will deep clean your home',            text: 'My place looked fresh and spotless after the service. Best cleaner in the decade!' },
    { id: 2, author: 'Mary Katherine',  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=60&h=60&fit=crop&auto=format&q=80', rating: 5, date: '8 Dec, 2024',  favor: 'I will deep clean your home',            text: 'Quick, professional, and left my place spotless — highly recommended!' },
    { id: 3, author: 'James Wilson',    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=60&h=60&fit=crop&auto=format&q=80', rating: 4, date: '2 Dec, 2024',  favor: 'I will fix your electric supply issue', text: 'Great service, very thorough and on time. Will book again for sure.' },
    { id: 4, author: 'Sarah Mitchell',  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=60&h=60&fit=crop&auto=format&q=80', rating: 5, date: '28 Nov, 2024', favor: 'I will landscape your garden beautifully', text: 'Absolutely phenomenal work. My garden has never looked this beautiful.' },
  ],
};

const TEAM_SELLER = {
  ...SELLER,
  id: 'team-1',
  isTeam: true,
  name: 'The Bright Services',
  badge: 'Team' as const,
  avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=160&h=160&fit=crop&auto=format&q=80',
  cover: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1400&h=300&fit=crop&auto=format&q=60',
  specialty: 'Commercial & Residential Cleaning Team',
  members: [
    { id: '1', name: 'James Doe',       avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&auto=format&q=80', jobs: 120, rating: 4.8, reviews: 90  },
    { id: '2', name: 'Melissa Anthony', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&h=80&fit=crop&auto=format&q=80', jobs: 40,  rating: 4.8, reviews: 20  },
    { id: '3', name: 'Carlos Rivera',   avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&fit=crop&auto=format&q=80', jobs: 87,  rating: 4.7, reviews: 61  },
    { id: '4', name: 'Laura Kim',       avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format&q=80', jobs: 65,  rating: 4.9, reviews: 44  },
  ],
};

const EXPLORE_PROVIDERS = [
  { id: '2', name: 'Kyle Stanford',      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&auto=format&q=80', badge: 'Pro',  rating: 4.9, reviews: '3,201', jobs: 210, specialty: 'Electrician'       },
  { id: '3', name: 'Maria Santos',       avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&h=80&fit=crop&auto=format&q=80', badge: 'Team', rating: 4.7, reviews: '1,876', jobs: 156, specialty: 'Furniture Assembly' },
  { id: '4', name: 'Sophie Lee',         avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&h=80&fit=crop&auto=format&q=80', badge: 'Pro',  rating: 4.9, reviews: '2,107', jobs: 431, specialty: 'Plumbing Expert'    },
  { id: '5', name: 'Liam Jones',         avatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=80&h=80&fit=crop&auto=format&q=80', badge: 'Team', rating: 4.6, reviews: '893',   jobs: 247, specialty: 'Interior Painter'   },
];

/* ─── helpers ───────────────────────────────────────── */
const GRAD = 'linear-gradient(135deg,#BF75FF 0%,#A54AFF 50%,#8430E0 100%)';

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

function BadgePill({ b }: { b: string }) {
  return (
    <span style={{ background: b === 'Pro' ? GRAD : 'linear-gradient(135deg,#34D399,#079455)', borderRadius: '9999px', padding: '4px 12px', fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: 700, color: '#fff', letterSpacing: '0.03em' }}>{b}</span>
  );
}

function Divider() {
  return <div style={{ height: '1px', background: '#EAECF0', margin: '28px 0' }} />;
}

function StatChip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
      {icon}
      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#475467' }}>{label}</span>
    </div>
  );
}

/* ─── page ───────────────────────────────────────────── */
export default function SellerProfilePage() {
  const router = useRouter();
  const [msgOpen,   setMsgOpen]   = useState(false);
  const [msgText,   setMsgText]   = useState('');
  const [showMore,  setShowMore]  = useState(false);
  const [showRev,   setShowRev]   = useState(false);

  // Toggle between individual / team for demo (in real app use params.id)
  const [isTeamView] = useState(false);
  const seller = isTeamView ? TEAM_SELLER : SELLER;

  const favors  = showMore  ? seller.favors   : seller.favors.slice(0, 3);
  const reviews = showRev   ? seller.reviews  : seller.reviews.slice(0, 2);

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#FAFAFA', paddingTop: '88px' }}>

        {/* ── Cover photo hero ── */}
        <div style={{ position: 'relative', height: '280px', background: '#F3E8FF', overflow: 'hidden' }}>
          <img src={seller.cover} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 40%, rgba(13,1,32,0.7) 100%)' }} />
          {/* Back button */}
          <button onClick={() => router.back()}
            style={{ position: 'absolute', top: '20px', left: '32px', display: 'flex', alignItems: 'center', gap: '6px', background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.3)', borderRadius: '9999px', padding: '8px 16px', cursor: 'pointer', fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 500, color: '#fff' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </button>
        </div>

        {/* ── Profile card strip ── */}
        <div style={{ maxWidth: '1376px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '24px', padding: '28px 32px', marginTop: '-60px', position: 'relative', zIndex: 2, display: 'flex', alignItems: 'flex-end', gap: '24px', boxShadow: '0 4px 32px rgba(16,24,40,0.08)', flexWrap: 'wrap' }}>
            {/* Avatar */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <img src={seller.avatar} alt={seller.name}
                style={{ width: '100px', height: '100px', borderRadius: '9999px', objectFit: 'cover', border: '4px solid #fff', boxShadow: '0 4px 16px rgba(165,74,255,0.2)' }} />
              <div style={{ position: 'absolute', bottom: '4px', right: '4px', width: '18px', height: '18px', background: '#22C55E', borderRadius: '9999px', border: '2.5px solid #fff' }} />
            </div>
            {/* Info */}
            <div style={{ flex: 1, minWidth: '200px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px', flexWrap: 'wrap' }}>
                <h1 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '26px', color: '#101828', letterSpacing: '-0.01em' }}>{seller.name}</h1>
                <BadgePill b={seller.badge} />
              </div>
              <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#667085', marginBottom: '10px' }}>{seller.specialty}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <Stars n={Math.round(seller.rating)} size={15} />
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#101828' }}>{seller.rating}</span>
                  <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>({seller.reviews.toLocaleString()} reviews)</span>
                </div>
                <StatChip icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#98A2B3" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#98A2B3" strokeWidth="2"/></svg>} label={`${seller.distance} miles away`} />
              </div>
            </div>
            {/* CTA buttons */}
            <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
              <button onClick={() => setMsgOpen(true)}
                style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', background: '#fff', border: '1.5px solid #A54AFF', borderRadius: '9999px', padding: '11px 24px', cursor: 'pointer', transition: 'background 0.15s', whiteSpace: 'nowrap' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8F0FF'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#fff'; }}>
                Send a message
              </button>
              <button
                style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', background: GRAD, border: 'none', borderRadius: '9999px', padding: '11px 24px', cursor: 'pointer', whiteSpace: 'nowrap', boxShadow: '0 4px 12px rgba(165,74,255,0.3)' }}>
                Request Booking
              </button>
            </div>
          </div>

          {/* ── Two-col body ── */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px', alignItems: 'flex-start', padding: '36px 0 80px' }}>

            {/* ── LEFT ── */}
            <div>
              {/* Stats row */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '0' }}>
                {[
                  { label: 'Favors completed', value: seller.completedJobs.toLocaleString(), icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l2 2 4-4" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg> },
                  { label: 'Location',          value: seller.location,                      icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="#A54AFF" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke="#A54AFF" strokeWidth="2"/></svg> },
                  { label: 'Typical response',  value: `Responds ${seller.responseTime}`,   icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="#A54AFF" strokeWidth="2"/><path d="M12 6v6l4 2" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round"/></svg> },
                ].map(s => (
                  <div key={s.label} style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '18px', padding: '20px' }}>
                    <div style={{ marginBottom: '10px' }}>{s.icon}</div>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#101828', marginBottom: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.value}</p>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085' }}>{s.label}</p>
                  </div>
                ))}
              </div>

              <Divider />

              {/* About */}
              <div>
                <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828', marginBottom: '14px' }}>About</h2>
                {seller.about.split('\n\n').map((p, i) => (
                  <p key={i} style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#475467', lineHeight: '1.75', marginBottom: '12px' }}>{p}</p>
                ))}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
                  {[
                    { label: `Member since ${seller.memberSince}`, icon: '📅' },
                    ...seller.languages.map(l => ({ label: l, icon: '🌐' })),
                  ].map(t => (
                    <span key={t.label} style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 500, color: '#344054', background: '#F2F4F7', borderRadius: '9999px', padding: '5px 14px' }}>{t.icon} {t.label}</span>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Team members (only for team sellers) */}
              {seller.isTeam && 'members' in seller && (
                <>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                      <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828' }}>Team members <span style={{ fontSize: '14px', fontWeight: 500, color: '#667085' }}>({(seller as typeof TEAM_SELLER).members.length} members)</span></h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '14px' }}>
                      {(seller as typeof TEAM_SELLER).members.map(m => (
                        <div key={m.id} onClick={() => router.push(`/seller/${m.id}`)}
                          style={{ display: 'flex', alignItems: 'center', gap: '14px', background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '16px', padding: '16px', cursor: 'pointer', transition: 'all 0.15s' }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.3)'; el.style.boxShadow = '0 4px 16px rgba(165,74,255,0.08)'; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#EAECF0'; el.style.boxShadow = 'none'; }}>
                          <img src={m.avatar} alt={m.name} style={{ width: '52px', height: '52px', borderRadius: '9999px', objectFit: 'cover', border: '2px solid #DFBAFF', flexShrink: 0 }} />
                          <div>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#101828', marginBottom: '3px' }}>{m.name}</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Stars n={Math.round(m.rating)} size={12} />
                              <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#98A2B3' }}>{m.reviews} reviews</span>
                            </div>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '11px', color: '#667085', marginTop: '2px' }}>{m.jobs} favors completed</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Divider />
                </>
              )}

              {/* Favors */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828' }}>
                    Favors <span style={{ fontSize: '14px', fontWeight: 500, color: '#667085' }}>({seller.favors.length} available)</span>
                  </h2>
                  <button onClick={() => setShowMore(s => !s)}
                    style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    {showMore ? 'Show less' : 'See all'}
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {favors.map(f => (
                    <div key={f.id} onClick={() => router.push(`/favor/${f.id}`)}
                      style={{ display: 'flex', gap: '16px', background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', transition: 'all 0.15s' }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.3)'; el.style.boxShadow = '0 4px 16px rgba(165,74,255,0.08)'; }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#EAECF0'; el.style.boxShadow = 'none'; }}>
                      <div style={{ width: '140px', height: '110px', flexShrink: 0, overflow: 'hidden' }}>
                        <img src={f.image} alt={f.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div style={{ flex: 1, padding: '16px 16px 16px 0', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '15px', color: '#101828', lineHeight: '1.4' }}>{f.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <Stars n={Math.round(f.rating)} size={13} />
                            <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#98A2B3' }}>({f.reviews.toLocaleString()})</span>
                          </div>
                          <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 800, fontSize: '20px', background: GRAD, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>from ${f.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Divider />

              {/* Reviews */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '20px', color: '#101828', marginBottom: '4px' }}>Reviews</h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Stars n={Math.round(seller.rating)} size={16} />
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#101828' }}>{seller.rating}</span>
                      <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>({seller.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                  <button onClick={() => setShowRev(s => !s)}
                    style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', textUnderlineOffset: '3px' }}>
                    {showRev ? 'Show less' : 'See all'}
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {reviews.map(r => (
                    <div key={r.id} style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '16px', padding: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        <img src={r.avatar} alt={r.author} style={{ width: '44px', height: '44px', borderRadius: '9999px', objectFit: 'cover', border: '2px solid #DFBAFF', flexShrink: 0 }} />
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#101828' }}>{r.author}</p>
                            <Stars n={r.rating} size={13} />
                          </div>
                          <div style={{ display: 'flex', gap: '12px' }}>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#98A2B3' }}>{r.date}</p>
                            <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#A54AFF', fontWeight: 500 }}>{r.favor}</p>
                          </div>
                        </div>
                      </div>
                      <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '14px', color: '#475467', lineHeight: '1.65' }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ── RIGHT sticky sidebar ── */}
            <div style={{ position: 'sticky', top: '108px', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Contact card */}
              <div style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 24px rgba(16,24,40,0.06)' }}>
                <div style={{ padding: '24px', borderBottom: '1px solid #EAECF0' }}>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '17px', color: '#101828', marginBottom: '4px' }}>Get in touch</p>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#667085' }}>Responds {seller.responseTime}</p>
                </div>
                <div style={{ padding: '20px 24px' }}>
                  <button onClick={() => setMsgOpen(true)}
                    style={{ width: '100%', fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#fff', background: GRAD, border: 'none', borderRadius: '9999px', padding: '13px', cursor: 'pointer', marginBottom: '10px', boxShadow: '0 4px 12px rgba(165,74,255,0.25)', transition: 'opacity 0.2s' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
                    Send a message
                  </button>
                  <button
                    style={{ width: '100%', fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#344054', background: '#F9FAFB', border: '1.5px solid #D0D5DD', borderRadius: '9999px', padding: '12px', cursor: 'pointer', transition: 'all 0.15s' }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#A54AFF'; el.style.color = '#A54AFF'; }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#D0D5DD'; el.style.color = '#344054'; }}>
                    Request Booking
                  </button>
                </div>
              </div>

              {/* Quick stats card */}
              <div style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '20px', padding: '20px 22px' }}>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#101828', marginBottom: '14px' }}>Quick stats</p>
                {[
                  { label: 'Favors completed', value: seller.completedJobs.toLocaleString() },
                  { label: 'On-time delivery', value: '98%' },
                  { label: 'Order completion', value: '97%' },
                  { label: 'Repeat clients', value: '76%' },
                ].map((s, i, arr) => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < arr.length - 1 ? '1px solid #F2F4F7' : 'none' }}>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', color: '#475467' }}>{s.label}</span>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '14px', color: '#101828' }}>{s.value}</span>
                  </div>
                ))}
              </div>

              {/* Verification badges */}
              <div style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '20px', padding: '20px 22px' }}>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#101828', marginBottom: '14px' }}>Verifications</p>
                {seller.verifications.map(v => (
                  <div key={v} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 0', borderBottom: '1px solid #F2F4F7' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '9999px', background: '#ECFDF3', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="#079455" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </div>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '13px', fontWeight: 500, color: '#344054' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Explore best providers — full width ── */}
        <div style={{ background: '#F8F0FF', borderTop: '1px solid #EAECF0', padding: '64px 0' }}>
          <div style={{ maxWidth: '1376px', margin: '0 auto', padding: '0 32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
              <div>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', fontWeight: 600, color: '#A54AFF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>Top rated</p>
                <h2 style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '24px', color: '#101828' }}>Explore best favor providers</h2>
              </div>
              <button onClick={() => router.push('/explore/search?type=sellers')}
                style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', background: '#fff', border: '1.5px solid #A54AFF', borderRadius: '9999px', padding: '10px 24px', cursor: 'pointer' }}>
                See all
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '20px' }}>
              {EXPLORE_PROVIDERS.map(p => (
                <div key={p.id} onClick={() => router.push(`/seller/${p.id}`)}
                  style={{ background: '#fff', border: '1.5px solid #EAECF0', borderRadius: '20px', padding: '20px', cursor: 'pointer', transition: 'all 0.15s', textAlign: 'center' }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.3)'; el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.1)'; el.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#EAECF0'; el.style.boxShadow = 'none'; el.style.transform = 'translateY(0)'; }}>
                  <div style={{ position: 'relative', display: 'inline-block', marginBottom: '12px' }}>
                    <img src={p.avatar} alt={p.name} style={{ width: '72px', height: '72px', borderRadius: '9999px', objectFit: 'cover', border: '3px solid #DFBAFF' }} />
                    <div style={{ position: 'absolute', bottom: '2px', right: '2px', width: '16px', height: '16px', background: '#22C55E', borderRadius: '9999px', border: '2px solid #fff' }} />
                  </div>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '15px', color: '#101828', marginBottom: '4px' }}>{p.name}</p>
                  <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085', marginBottom: '10px' }}>{p.specialty}</p>
                  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
                    <Stars n={Math.round(p.rating)} size={13} />
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828' }}>{p.rating}</span>
                    <span style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#98A2B3' }}>({p.reviews})</span>
                  </div>
                  <BadgePill b={p.badge} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Message modal */}
      {msgOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          onClick={e => { if (e.target === e.currentTarget) setMsgOpen(false); }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)', backdropFilter: 'blur(4px)' }} onClick={() => setMsgOpen(false)} />
          <div style={{ position: 'relative', background: '#fff', borderRadius: '24px', padding: '36px', width: '100%', maxWidth: '480px', zIndex: 1, boxShadow: '0 24px 48px rgba(0,0,0,0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
              <img src={seller.avatar} alt={seller.name} style={{ width: '48px', height: '48px', borderRadius: '9999px', objectFit: 'cover', border: '2px solid #DFBAFF' }} />
              <div>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontWeight: 700, fontSize: '16px', color: '#101828' }}>Message {seller.name}</p>
                <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '12px', color: '#667085' }}>Usually responds {seller.responseTime}</p>
              </div>
            </div>
            <textarea value={msgText} onChange={e => setMsgText(e.target.value)} placeholder={`Hi ${seller.name}! I'm interested in your services...`}
              style={{ width: '100%', height: '130px', border: '1.5px solid #D0D5DD', borderRadius: '12px', padding: '12px 14px', fontFamily: 'Poppins,sans-serif', fontSize: '14px', resize: 'none', outline: 'none', boxSizing: 'border-box', transition: 'border-color 0.15s' }}
              onFocus={e => { (e.currentTarget as HTMLElement).style.borderColor = '#A54AFF'; }}
              onBlur={e => { (e.currentTarget as HTMLElement).style.borderColor = '#D0D5DD'; }} />
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => setMsgOpen(false)} style={{ flex: 1, fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: 600, color: '#344054', background: '#F9FAFB', border: '1.5px solid #D0D5DD', borderRadius: '9999px', padding: '12px', cursor: 'pointer' }}>Cancel</button>
              <button style={{ flex: 2, fontFamily: 'Poppins,sans-serif', fontSize: '14px', fontWeight: 700, color: '#fff', background: GRAD, border: 'none', borderRadius: '9999px', padding: '12px', cursor: 'pointer' }}>Send Message</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
