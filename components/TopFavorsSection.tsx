'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StarIcon } from './Icons';

const FAVORS = [
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format&q=75',
    title: 'I will deep clean your home',
    price: '$253',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=72&h=72&fit=crop&auto=format&q=80',
    seller: 'Alfonzo Schuessler', sellerBadge: 'Pro', rating: '4.8', reviews: '8,890',
  },
  {
    image: 'https://images.unsplash.com/photo-1509390144018-eefc5d47764f?w=600&h=400&fit=crop&auto=format&q=75',
    title: 'I will fix all your electrical issues',
    price: '$180',
    sellerAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=72&h=72&fit=crop&auto=format&q=80',
    seller: 'James Thornton', sellerBadge: 'Team', rating: '4.9', reviews: '5,214',
  },
  {
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&auto=format&q=75',
    title: 'Professional furniture assembly service',
    price: '$95',
    sellerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=72&h=72&fit=crop&auto=format&q=80',
    seller: 'Maria Santos', sellerBadge: 'Pro', rating: '4.7', reviews: '3,102',
  },
  {
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&auto=format&q=75',
    title: 'I will landscape your garden beautifully',
    price: '$120',
    sellerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=72&h=72&fit=crop&auto=format&q=80',
    seller: 'Sam Smith', sellerBadge: 'Team', rating: '4.8', reviews: '2,341',
  },
  {
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&auto=format&q=75',
    title: 'Interior painting & wall finishing',
    price: '$300',
    sellerAvatar: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=72&h=72&fit=crop&auto=format&q=80',
    seller: 'Liam Jones', sellerBadge: 'Pro', rating: '4.9', reviews: '4,102',
  },
  {
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&auto=format&q=75',
    title: 'Professional plumbing repair service',
    price: '$150',
    sellerAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=72&h=72&fit=crop&auto=format&q=80',
    seller: 'Sophie Lee', sellerBadge: 'Team', rating: '4.6', reviews: '1,876',
  },
];

export default function TopFavorsSection() {
  const router = useRouter();
  const [likedFavors, setLikedFavors] = useState<Set<string>>(new Set());

  const toggleLike = (title: string) => {
    setLikedFavors(prev => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title); else next.add(title);
      return next;
    });
  };

  return (
    <section id="favors" style={{ padding: '96px 0', background: '#ffffff' }}>
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '48px' }}>
          <div>
            <p data-animate="fade" style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '13px', color: '#A54AFF', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '8px' }}>Most Requested</p>
            <h2 data-animate style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '36px', lineHeight: '1.2', color: '#101828', letterSpacing: '-0.01em' }}>
              Top Favors on{' '}
              <span style={{ background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>WhoCan</span>
            </h2>
            <p data-animate data-delay="1" style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', color: '#475467', marginTop: '8px' }}>People are requesting these favors the most</p>
          </div>
          <a href="/explore" data-animate="fade" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', padding: '10px 20px', borderRadius: '9999px', border: '1.5px solid #A54AFF', transition: 'all 0.2s ease', whiteSpace: 'nowrap' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8F0FF'; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}>
            View All Favors
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="#A54AFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '24px' }}>
          {FAVORS.map((favor, i) => {
            const liked = likedFavors.has(favor.title);
            return (
              <div key={favor.title} data-animate data-delay={String((i % 3) + 1)} onClick={() => router.push(`/favor/${i + 1}`)} style={{ background: '#ffffff', borderRadius: '20px', border: '1.5px solid #EAECF0', cursor: 'pointer', transition: 'border-color 0.2s ease, box-shadow 0.2s ease', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.3)'; el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.1)'; }}
                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#EAECF0'; el.style.boxShadow = 'none'; }}>

                {/* Image + badge */}
                <div style={{ position: 'relative', padding: '10px 10px 0' }}>
                  <div style={{ height: '200px', borderRadius: '14px', overflow: 'hidden' }}>
                    <img src={favor.image} alt={favor.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }} />
                  </div>
                  <div style={{ position: 'absolute', top: '20px', right: '20px', background: favor.sellerBadge === 'Pro' ? 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 100%)' : 'linear-gradient(135deg, #34D399 0%, #079455 100%)', borderRadius: '9999px', padding: '4px 12px', fontFamily: 'Poppins, sans-serif', fontSize: '11px', fontWeight: 700, color: '#ffffff', letterSpacing: '0.03em' }}>
                    {favor.sellerBadge}
                  </div>
                </div>

                {/* Card body */}
                <div style={{ padding: '16px 16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  {/* Seller row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                    <img src={favor.sellerAvatar} alt={favor.seller} onClick={e => { e.stopPropagation(); router.push('/seller/1'); }} style={{ width: '36px', height: '36px', borderRadius: '9999px', objectFit: 'cover', objectPosition: 'top', flexShrink: 0, border: '2px solid #DFBAFF' }} />
                    <div>
                      <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828', lineHeight: '1.2' }}>{favor.seller}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <svg viewBox="0 0 24 24" width="12" height="12"><polygon fill="#F79009" stroke="none" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 600, color: '#F79009' }}>{favor.rating}</span>
                        <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#98A2B3' }}>({favor.reviews})</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '15px', color: '#101828', lineHeight: '1.4', flex: 1, marginBottom: '16px' }}>{favor.title}</h3>

                  {/* Bottom: heart + price */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #EAECF0' }}>
                    <button
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', lineHeight: 0, display: 'flex', alignItems: 'center' }}
                      onClick={e => { e.stopPropagation(); toggleLike(favor.title); }}
                      aria-label={liked ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <svg viewBox="0 0 24 24" width="28" height="28">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                          stroke={liked ? '#F43F5E' : '#98A2B3'}
                          strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                          fill={liked ? '#F43F5E' : 'none'}
                          style={{ transition: 'all 0.2s ease' }}
                        />
                      </svg>
                    </button>
                    <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '26px', background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: '1' }}>{favor.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
