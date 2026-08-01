'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FiltersModal from '@/components/FiltersModal';

// Optimised avatar URLs — retina 72px display at 2x
const AVA = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=72&h=72&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=72&h=72&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=72&h=72&fit=crop&auto=format&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=72&h=72&fit=crop&auto=format&q=80',
];

// Optimised service images — 600px wide at q=75
const IMGS = [
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop&auto=format&q=75',
  'https://images.unsplash.com/photo-1509390144018-eefc5d47764f?w=600&h=400&fit=crop&auto=format&q=75',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=400&fit=crop&auto=format&q=75',
  'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop&auto=format&q=75',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=400&fit=crop&auto=format&q=75',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop&auto=format&q=75',
];

const ALL_FAVORS = Array.from({ length: 30 }, (_, i) => ({
  id: `favor-${i}`,
  image: IMGS[i % 6],
  title: ['Deep Home Cleaning', 'Electrical Repairs', 'Furniture Assembly', 'Garden Landscaping', 'Interior Painting', 'Plumbing Fix'][i % 6],
  price: [253, 180, 95, 120, 300, 150][i % 6] + (i > 15 ? 20 : 0),
  badge: i % 3 === 0 ? 'Pro' : 'Team',
  rating: (4.6 + (i % 4) * 0.1).toFixed(1),
  reviews: `${(100 + i * 37).toLocaleString()}`,
  category: ['Cleaning', 'Electrical', 'Assembly', 'Gardening', 'Painting', 'Plumbing'][i % 6],
  sellerAvatar: AVA[i % 4],
  seller: ['Alfonzo S.', 'James T.', 'Maria R.', 'David K.', 'Sarah M.', 'Tom W.'][i % 6],
}));

const ALL_SELLERS = Array.from({ length: 20 }, (_, i) => ({
  id: `seller-${i}`,
  image: AVA[i % 4].replace('w=72&h=72', 'w=400&h=500'),
  name: ['John Doe', 'Chris Gale', 'Olivia Rhye', 'Sam Smith', 'Emma Brown', 'Liam Jones', 'Sophie Lee', 'Ava Davis'][i % 8],
  badge: i % 3 === 0 ? 'Pro' : 'Team',
  rating: (4.6 + (i % 4) * 0.1).toFixed(1),
  reviews: `${(500 + i * 123).toLocaleString()}`,
  jobs: 150 + i * 23,
  specialty: ['Cleaning Expert', 'Electrician', 'Plumber', 'Carpenter', 'Painter', 'Gardener'][i % 6],
}));

const CATEGORIES = ['All', 'Gardening', 'Cleaning', 'Repairing', 'Electrical', 'Assembly', 'Painting', 'Plumbing'];
const COLS_FAVORS = 3;
const ROWS_PER_PAGE = 5;
const PAGE_FAVORS = COLS_FAVORS * ROWS_PER_PAGE;
const PAGE_SELLERS = 4 * ROWS_PER_PAGE;

const BADGE = (b: string) => ({
  position: 'absolute' as const, top: '20px', right: '20px',
  background: b === 'Pro' ? 'linear-gradient(135deg,#BF75FF,#A54AFF)' : 'linear-gradient(135deg,#34D399,#079455)',
  borderRadius: '9999px', padding: '4px 12px',
  fontFamily: 'Poppins,sans-serif', fontSize: '11px', fontWeight: 700, color: '#fff', letterSpacing: '0.03em',
});

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchType, setSearchType] = useState<'favors' | 'sellers'>(
    (searchParams.get('type') as 'favors' | 'sellers') || 'favors'
  );
  const [query, setQuery]                     = useState(searchParams.get('q') || '');
  const [activeCategories, setActiveCategories] = useState<string[]>(() => {
    const c = searchParams.get('category');
    return c ? [c] : ['All'];
  });
  const [sortBy, setSortBy]         = useState<'relevance' | 'price'>('relevance');
  const [typeDropOpen, setTypeDrop] = useState(false);
  const [filtersOpen, setFilters]   = useState(false);
  const [visibleCount, setVisible]  = useState(PAGE_FAVORS);
  const [likedFavors, setLiked]     = useState<Set<string>>(new Set());
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setVisible(searchType === 'favors' ? PAGE_FAVORS : PAGE_SELLERS); }, [searchType, activeCategories, sortBy]);

  useEffect(() => {
    const el = loaderRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(entries => { if (entries[0].isIntersecting) setVisible(p => p + (searchType === 'favors' ? COLS_FAVORS : 4) * ROWS_PER_PAGE); }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  });

  const toggleCat = (cat: string) => {
    if (cat === 'All') { setActiveCategories(['All']); return; }
    setActiveCategories(prev => {
      const without = prev.filter(c => c !== 'All');
      if (without.includes(cat)) {
        const next = without.filter(c => c !== cat);
        return next.length === 0 ? ['All'] : next;
      }
      return [...without, cat];
    });
  };

  const handleSearch = () => {
    const params = new URLSearchParams({ q: query, type: searchType });
    const cats = activeCategories.filter(c => c !== 'All');
    if (cats.length === 1) params.set('category', cats[0]);
    router.push(`/explore/search?${params.toString()}`);
  };

  const matchesCat = (itemCat: string) =>
    activeCategories.includes('All') || activeCategories.includes(itemCat);

  const filteredFavors = ALL_FAVORS.filter(f =>
    matchesCat(f.category) &&
    (!query || f.title.toLowerCase().includes(query.toLowerCase()) || f.category.toLowerCase().includes(query.toLowerCase()))
  );
  const sortedFavors = [...filteredFavors].sort((a, b) => sortBy === 'price' ? a.price - b.price : 0);

  const filteredSellers = ALL_SELLERS.filter(s =>
    (!query || s.name.toLowerCase().includes(query.toLowerCase()) || s.specialty.toLowerCase().includes(query.toLowerCase()))
  );
  const sortedSellers = [...filteredSellers].sort((a, b) => sortBy === 'price' ? a.jobs - b.jobs : 0);

  const items = searchType === 'favors' ? sortedFavors : sortedSellers;
  const visibleItems = items.slice(0, visibleCount);
  const colCount = searchType === 'favors' ? COLS_FAVORS : 4;
  const hasMore = visibleCount < items.length;

  const toggleLike = (id: string) => setLiked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // Shared input/button radius
  const R = '9999px';

  return (
    <>
      <Navbar />
      {filtersOpen && <FiltersModal onClose={() => setFilters(false)} />}
      <main style={{ minHeight: '100vh', background: '#FAFAFA', paddingTop: '88px' }}>

        {/* Search bar row */}
        <div style={{ background: '#ffffff', borderBottom: '1px solid #EAECF0', padding: '20px 0' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <h1 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '24px', color: '#101828', marginRight: '8px', flexShrink: 0 }}>Explore</h1>

            {/* Search input */}
            <div style={{ flex: 1, minWidth: '220px', display: 'flex', alignItems: 'center', background: '#F9FAFB', border: '1.5px solid #EAECF0', borderRadius: R, padding: '10px 16px', gap: '8px' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="#98A2B3" strokeWidth="2" /><path d="M21 21l-4.35-4.35" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" /></svg>
              <input type="text" placeholder={`Search ${searchType}...`} value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') handleSearch(); }}
                style={{ flex: 1, border: 'none', outline: 'none', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#101828', background: 'transparent' }} />
              {query && (
                <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#98A2B3', lineHeight: 0, padding: 0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#98A2B3" strokeWidth="2" strokeLinecap="round" /></svg>
                </button>
              )}
            </div>

            {/* Type dropdown */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <button onClick={() => setTypeDrop(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '14px', color: '#344054', background: '#F9FAFB', border: '1.5px solid #EAECF0', borderRadius: R, padding: '10px 14px', cursor: 'pointer' }}>
                {searchType === 'favors'
                  ? <><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg> Favors</>
                  : <><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="#667085" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" stroke="#667085" strokeWidth="2" /></svg> Sellers</>
                }
                <svg width="14" height="14" viewBox="0 0 12 12" fill="none" style={{ transition: 'transform 0.2s', transform: typeDropOpen ? 'rotate(180deg)' : 'none' }}><path d="M3 4.5L6 7.5L9 4.5" stroke="#667085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              {typeDropOpen && (
                <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, background: '#ffffff', border: '1px solid #EAECF0', borderRadius: '16px', boxShadow: '0 8px 24px rgba(16,24,40,0.1)', zIndex: 100, overflow: 'hidden', minWidth: '130px' }}>
                  {(['favors', 'sellers'] as const).map(t => (
                    <button key={t} onClick={() => { setSearchType(t); setTypeDrop(false); }} style={{ width: '100%', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 14px', fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: searchType === t ? '#A54AFF' : '#344054', background: searchType === t ? '#F8F0FF' : 'transparent', border: 'none', cursor: 'pointer' }}>
                      {t === 'favors'
                        ? <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        : <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2" /></svg>
                      }{' '}{t.charAt(0).toUpperCase() + t.slice(1)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Search button */}
            <button onClick={handleSearch}
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px', color: '#ffffff', background: 'linear-gradient(135deg, #BF75FF 0%, #A54AFF 50%, #8430E0 100%)', border: 'none', borderRadius: R, padding: '11px 24px', cursor: 'pointer', flexShrink: 0, transition: 'opacity 0.2s' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = '0.9'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = '1'; }}>
              Search
            </button>

            {/* More filters */}
            <button onClick={() => setFilters(true)}
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '14px', color: '#344054', background: '#F9FAFB', border: '1.5px solid #D0D5DD', borderRadius: R, padding: '10px 16px', cursor: 'pointer', flexShrink: 0, transition: 'all 0.15s' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#A54AFF'; el.style.color = '#A54AFF'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#D0D5DD'; el.style.color = '#344054'; }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M4 6h16M8 12h8M12 18h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
              More filters
            </button>
          </div>
        </div>

        {/* Category pills */}
        <div style={{ background: '#ffffff', borderBottom: '1px solid #EAECF0', padding: '12px 0' }}>
          <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {CATEGORIES.map(cat => {
              const on = activeCategories.includes(cat);
              return (
                <button key={cat} onClick={() => toggleCat(cat)}
                  style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500, fontSize: '13px', whiteSpace: 'nowrap', padding: '7px 16px', borderRadius: R, border: '1.5px solid', cursor: 'pointer', transition: 'all 0.15s', flexShrink: 0, ...(on ? { background: '#F4EBFF', borderColor: '#A54AFF', color: '#A54AFF', fontWeight: 600 } : { background: 'transparent', borderColor: '#EAECF0', color: '#344054' }) }}>
                  {cat}
                </button>
              );
            })}
            {/* More link */}
            <button onClick={() => setFilters(true)}
              style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '13px', color: '#A54AFF', background: 'transparent', border: 'none', cursor: 'pointer', padding: '7px 4px', whiteSpace: 'nowrap', textDecoration: 'underline', textUnderlineOffset: '3px', flexShrink: 0 }}>
              More
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="container" style={{ paddingTop: '32px', paddingBottom: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#667085' }}>
              <span style={{ fontWeight: 600, color: '#101828' }}>{items.length}</span> {searchType} found
            </p>
            <div style={{ display: 'flex', gap: '4px', background: '#F2F4F7', borderRadius: R, padding: '4px' }}>
              {(['relevance', 'price'] as const).map(s => (
                <button key={s} onClick={() => setSortBy(s)}
                  style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', fontWeight: 500, padding: '7px 16px', borderRadius: R, border: 'none', cursor: 'pointer', transition: 'all 0.2s', ...(sortBy === s ? { background: '#ffffff', color: '#A54AFF', boxShadow: '0 1px 4px rgba(0,0,0,0.08)' } : { background: 'transparent', color: '#667085' }) }}>
                  By {s.charAt(0).toUpperCase() + s.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {visibleItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '18px', fontWeight: 600, color: '#344054', marginBottom: '8px' }}>No results found</p>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '14px', color: '#667085' }}>Try adjusting your search or category filter.</p>
            </div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: `repeat(${colCount}, 1fr)`, gap: '24px' }}>
                {searchType === 'favors'
                  ? (visibleItems as typeof sortedFavors).map(favor => {
                      const liked = likedFavors.has(favor.id);
                      return (
                        <div key={favor.id}
                          style={{ background: '#ffffff', borderRadius: '20px', border: '1.5px solid #EAECF0', cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.2s', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.3)'; el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.1)'; }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#EAECF0'; el.style.boxShadow = 'none'; }}>

                          {/* Image + badge */}
                          <div style={{ position: 'relative', padding: '10px 10px 0' }}>
                            <div style={{ height: '200px', borderRadius: '14px', overflow: 'hidden' }}>
                              <img src={favor.image} alt={favor.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                                onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1.04)'; }}
                                onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.transform = 'scale(1)'; }} />
                            </div>
                            <div style={BADGE(favor.badge)}>{favor.badge}</div>
                          </div>

                          {/* Body */}
                          <div style={{ padding: '16px 16px 18px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                            {/* Seller row */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                              <img src={favor.sellerAvatar} alt={favor.seller} style={{ width: '36px', height: '36px', borderRadius: '9999px', objectFit: 'cover', flexShrink: 0, border: '2px solid #DFBAFF' }} />
                              <div>
                                <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828', lineHeight: '1.2' }}>{favor.seller}</p>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                                  <svg viewBox="0 0 24 24" width="12" height="12"><polygon fill="#F79009" stroke="none" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', fontWeight: 600, color: '#F79009' }}>{favor.rating}</span>
                                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: '#98A2B3' }}>({favor.reviews})</span>
                                </div>
                              </div>
                            </div>

                            <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '15px', color: '#101828', lineHeight: '1.4', flex: 1, marginBottom: '16px' }}>{favor.title}</h3>

                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #EAECF0' }}>
                              <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 0', lineHeight: 0 }} onClick={e => { e.stopPropagation(); toggleLike(favor.id); }}>
                                <svg viewBox="0 0 24 24" width="28" height="28">
                                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                                    stroke={liked ? '#F43F5E' : '#98A2B3'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill={liked ? '#F43F5E' : 'none'} style={{ transition: 'all 0.2s' }} />
                                </svg>
                              </button>
                              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '26px', background: 'linear-gradient(135deg,#BF75FF 0%,#A54AFF 50%,#8430E0 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', lineHeight: '1' }}>${favor.price}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : (visibleItems as typeof sortedSellers).map(seller => (
                      <div key={seller.id}
                        style={{ background: '#ffffff', borderRadius: '20px', border: '1.5px solid #EAECF0', cursor: 'pointer', transition: 'border-color 0.2s, box-shadow 0.2s', overflow: 'hidden' }}
                        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(165,74,255,0.3)'; el.style.boxShadow = '0 8px 24px rgba(165,74,255,0.1)'; }}
                        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = '#EAECF0'; el.style.boxShadow = 'none'; }}>

                        <div style={{ position: 'relative', padding: '10px 10px 0' }}>
                          <div style={{ height: '220px', borderRadius: '14px', overflow: 'hidden', background: '#F8F0FF' }}>
                            <img src={seller.image} alt={seller.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                          </div>
                          <div style={BADGE(seller.badge)}>{seller.badge}</div>
                        </div>

                        <div style={{ padding: '14px 16px 18px' }}>
                          <h3 style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '16px', color: '#101828', marginBottom: '6px' }}>{seller.name}</h3>
                          <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#667085', marginBottom: '6px' }}>{seller.specialty}</p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                            <svg viewBox="0 0 24 24" width="14" height="14"><polygon fill="#F79009" stroke="none" points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '13px', color: '#101828' }}>{seller.rating}</span>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D0D5DD' }}>|</span>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#667085' }}>{seller.reviews} reviews</span>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#D0D5DD' }}>/</span>
                            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#667085' }}>{seller.jobs} jobs</span>
                          </div>
                        </div>
                      </div>
                    ))
                }
              </div>

              {hasMore && (
                <div ref={loaderRef} style={{ marginTop: '36px', textAlign: 'center' }}>
                  <button onClick={() => setVisible(p => p + (searchType === 'favors' ? COLS_FAVORS : 4) * ROWS_PER_PAGE)}
                    style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 600, fontSize: '14px', color: '#A54AFF', background: '#ffffff', border: '1.5px solid #A54AFF', borderRadius: R, padding: '12px 36px', cursor: 'pointer', transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#F8F0FF'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#ffffff'; }}>
                    Show More
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12l7 7 7-7" stroke="#A54AFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: '#98A2B3', marginTop: '8px' }}>
                    Showing {visibleItems.length} of {items.length}
                  </p>
                </div>
              )}

              {!hasMore && items.length > 0 && (
                <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '13px', color: '#98A2B3', textAlign: 'center', marginTop: '36px' }}>
                  All {items.length} results shown
                </p>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', background: '#FAFAFA' }} />}>
      <SearchContent />
    </Suspense>
  );
}
